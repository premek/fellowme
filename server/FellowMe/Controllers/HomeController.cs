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
            var schedule = MvcApplication.GetSchedule();

            //search for people
            //TODO: rename name to jmeno
            var people = String.IsNullOrEmpty(q) ? null : (from student in schedule.STUDENTI
                          where    student.login.StartsWith(q, StringComparison.OrdinalIgnoreCase)
                                || student.jmeno.StartsWith(q, StringComparison.OrdinalIgnoreCase)
                                || student.prijmeni.StartsWith(q, StringComparison.OrdinalIgnoreCase)
                           select new { id = student.id, typ = "student", name = String.Format("{0} {1}", student.jmeno, student.prijmeni) })
                           .Union(from ucitel in schedule.UCITELE
                                  where (!String.IsNullOrEmpty(ucitel.login) && ucitel.login.StartsWith(q, StringComparison.OrdinalIgnoreCase))
                                        || (!String.IsNullOrEmpty(ucitel.jmeno) &&  ucitel.jmeno.StartsWith(q, StringComparison.OrdinalIgnoreCase))
                                        || (!String.IsNullOrEmpty(ucitel.prijmeni) && ucitel.prijmeni.StartsWith(q, StringComparison.OrdinalIgnoreCase))
                                  select new { id = ucitel.id, typ = "ucitel", name = String.Format("{0} {1}", ucitel.jmeno, ucitel.prijmeni) }).ToList();

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
            var schedule = MvcApplication.GetSchedule();
            var student = schedule.STUDENTI.Select(stud => new
            {
                id = stud.id,
                typ = "student",
                name = String.Format("{0} {1}", stud.jmeno, stud.prijmeni),
                titul = stud.titul,
                email = stud.stud_email,
                rocnik = stud.rocnik,
                fakulta = stud.fakulta,
                obor = stud.obor
            }).SingleOrDefault(x => String.Equals(x.id,id));

            if(student != null)
                return Json(new { success =true, results = new { student }}, JsonRequestBehavior.AllowGet);
            
            var ucitel = schedule.UCITELE.Select(uc => new
            {
                id = uc.id,
                typ = "ucitel",
                name = String.Format("{0} {1}", uc.jmeno, uc.prijmeni),
                titul_pred = uc.titul_pred,  
                titul_za = uc.titul_za,
                email = uc.uc_email,
                katedra = (from kat in schedule.KATEDRY
                           where String.Equals(kat.id, uc.kat_id)
                           select kat.nazev_cz).SingleOrDefault(),
             }).SingleOrDefault(x => String.Equals(x.id, id));

            if (ucitel == null)
                return JsonError;


            return Json(new { success = true, results = new { ucitel } }, JsonRequestBehavior.AllowGet);
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


            if((events != null) && (events.Count > 0))
                return Json(new { success = true, results = events }, JsonRequestBehavior.AllowGet);


             events = (from teacher in data.UCITELE
                           join list in data.LISTKY on teacher.id equals list.ucitel1_id
                           join pred in data.PREDMETY on list.predmet_id equals pred.id
                           join mist in data.MISTNOSTI on list.mistnost_id equals mist.id
                           let date = GetDate(list.den_cis, list.zacatek)
                           let week = (date.WeekNumber() % 2 == 0) ? "S" : "L"//get even/odd week
                           where String.Equals(teacher.id, id)
                              && (date != DateTime.MinValue) //eliminate invalid dates coming from the parsing function
                              && (String.IsNullOrEmpty(list.sudy_lichy) || String.Equals(list.sudy_lichy, week))
                           select new
                           {
                               co = pred.nazev,
                               kde = mist.cislo,
                               kdy = date
                           }).Distinct().ToList();

             return Json(new { success = (events != null) && events.Count > 0, results = events }, JsonRequestBehavior.AllowGet);
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
            //if (dow < 0)
            //    dow += 7; 

            var eday = Int32.Parse(day);
            var date = DateTime.Today.AddDays(eday < dow ?  (7 + eday - dow): (eday - dow));
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
