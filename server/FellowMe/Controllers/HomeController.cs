using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;
//using FellowMe.Models;
using System.Xml;

namespace FellowMe.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
           
            return View();
        }

        public ActionResult Search(string q)
        {
            var results = new
            {
                success = "true",
                results = String.IsNullOrEmpty(q) ? null : (from student in MvcApplication.GetSchedule().STUDENTI
                          where    student.login.Contains(q, StringComparison.OrdinalIgnoreCase)
                                || student.jmeno.Contains(q, StringComparison.OrdinalIgnoreCase)
                                || student.prijmeni.Contains(q, StringComparison.OrdinalIgnoreCase)
                           select new { id = student.id, name = String.Format("{0} {1}", student.jmeno, student.prijmeni) }).ToList()
            };


            return Json(results, JsonRequestBehavior.AllowGet);
        }


        public ActionResult RefreshCache()
        {
            //refresh the inmemory data
            MvcApplication.ImportData();

            return new HttpStatusCodeResult(200);   //OK
        }
    }
}
