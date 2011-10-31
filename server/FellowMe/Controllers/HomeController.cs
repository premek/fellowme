using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;
using System.Xml;

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

            //get even/odd week
            var week = (DateTime.Now.WeekNumber() % 2 == 0) ? "S" : "L";

            //query schedule
            var events = (from stud in data.STUDENTI
                      join rel in data.LISTKY_STUDENTU on stud.id equals rel.student_id
                      join list in data.LISTKY on rel.listek_id equals list.id
                      join pred in data.PREDMETY on list.predmet_id equals pred.id
                      join mist in data.MISTNOSTI on list.mistnost_id equals mist.id
                      where String.Equals(stud.id, id)
                        //&& String.Equals(list.sudy_lichy, week)
                      select new
                      {
                          predmet = pred.nazev,
                          mistnost = mist.cislo,
                          den = list.den_cis,
                          zacatek = list.zacatek,
                          pocet_hodin = list.pocet_hodin

                      }).ToList();


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



        // error JSON result
        private JsonResult JsonError { get { return Json(new { success = false, results = new object[] { } }, JsonRequestBehavior.AllowGet); } }
    }
}
