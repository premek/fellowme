using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;
using System.Xml;
using System.Text.RegularExpressions;

namespace FellowMe.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpHeader("Access-Control-Allow-Origin", "*")]
        [HttpHeader("Access-Control-Allow-Headers", "x-requested-with")]
        public ActionResult Search(string q)
        {
            //search for people
            var people = String.IsNullOrEmpty(q) ? null : (from student in MvcApplication.GetSchedule().STUDENTI
                          where    student.login.Contains(q, StringComparison.OrdinalIgnoreCase)
                                || student.jmeno.Contains(q, StringComparison.OrdinalIgnoreCase)
                                || student.prijmeni.Contains(q, StringComparison.OrdinalIgnoreCase)
                           select new { id = student.id, name = String.Format("{0} {1}", student.jmeno, student.prijmeni) }).ToList();

            //assemble the resulting JSON
            var results = new
            {
                success = (people != null) && (people.Count > 0), 
                results = people
            };

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpHeader("Access-Control-Allow-Origin", "*")]
        [HttpHeader("Access-Control-Allow-Headers", "x-requested-with")]
        public ActionResult Person(string id)
        {
            var person = MvcApplication.GetSchedule().STUDENTI.SingleOrDefault(x => String.Equals(x.id,id));
            if (person == null)
                return JsonError;

            var results = new
            {
                success = true,
                results = new { id = person.id,
                                name = String.Format("{0} {1}", person.jmeno, person.prijmeni),
                                titul = person.titul,
                                email = person.stud_email,
                                rocnik = person.rocnik,
                                fakulta = person.fakulta,
                                obor = person.obor}
            };


            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpHeader("Access-Control-Allow-Origin", "*")]
        [HttpHeader("Access-Control-Allow-Headers", "x-requested-with")]
        public ActionResult Schedule(string id)
        {
            var data = MvcApplication.GetSchedule();


            //query schedule
            var events = (from stud in data.STUDENTI
                      join rel in data.LISTKY_STUDENTU on stud.id equals rel.student_id
                      join list in data.LISTKY on rel.listek_id equals list.id
                      join pred in data.PREDMETY on list.predmet_id equals pred.id
                      join mist in data.MISTNOSTI on list.mistnost_id equals mist.id
                      let date = GetDate(list.den_cis, list.zacatek)
                      let week = (date.WeekNumber() % 2 == 0) ? "S" : "L"//get even/odd week
                      where String.Equals(stud.id, id)
                         && (date != DateTime.MinValue) //eliminate invalid dates coming from the parsing function
                         && (String.IsNullOrEmpty(list.sudy_lichy) || String.Equals(list.sudy_lichy, week))
                      select new
                      {
                          co = pred.nazev,
                          kde = mist.cislo,
                          kdy = date
                          //pocet_hodin = list.pocet_hodin
                      }).ToList();

            //TODO: add limit to time when schedule is returned (only during term)


            var results = new
            {
                success = (events != null) && events.Count > 0,
                results = events
            };

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RefreshCache()
        {
            //refresh the in-memory data
            MvcApplication.ImportData();

            return new HttpStatusCodeResult(200);   //OK
        }

        #region Helpers

        private DateTime GetDate(string day, string time)
        {
            if (String.IsNullOrEmpty(day) || String.IsNullOrEmpty(time))
                return DateTime.MinValue;

            var dow = (int)DateTime.Now.DayOfWeek;
            if (dow < 0)
                dow += 7; 

            var eday = Int32.Parse(day);
            var date = DateTime.Today.AddDays(eday < dow ?  (7 - eday - dow): (eday - dow));
            var match = TimeRegex.Match(time);

            if (!match.Success)
                return DateTime.MinValue;

            date = date.AddHours(Double.Parse(match.Groups[1].Value)).AddMinutes(Double.Parse(match.Groups[2].Value));

            return date;
        }

        //regex for parsing time information
        private Regex TimeRegex = new Regex("^([0-9]{1,2}):([0-9]{2})$");

        // error JSON result
        private JsonResult JsonError { get { return Json(new { success = false, results = new object[] { } }, JsonRequestBehavior.AllowGet); } }

        #endregion
    }
}
