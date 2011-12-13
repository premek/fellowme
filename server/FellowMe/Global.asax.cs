using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Xml.Serialization;
using System.Xml;

namespace FellowMe
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private const string RZ_DATA_KEY = "RzXmlDataKey";

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            ImportData();
        }

        //protected void Application_BeginRequest(object sender, EventArgs e)
        //{
        //    string rqstMethod = HttpContext.Current.Request.HttpMethod;

        //    //Elmah.ErrorLog.GetDefault(HttpContext.Current).Log(new Elmah.Error(new Exception(rqstMethod)));

        //    if (rqstMethod == "OPTIONS" )//|| rqstMethod == "POST"
        //    {
        //        HttpContext.Current.Response.AppendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        //        HttpContext.Current.Response.AppendHeader("Access-Control-Allow-Headers", "X-Requested-With, Accept, Access-Control-Allow-Origin");
        //        HttpContext.Current.Response.AppendHeader("Test", "Ondrej");

        //        HttpContext.Current.Response.Clear();
        //        HttpContext.Current.Response.StatusCode = 200;
        //        HttpContext.Current.Response.Write("test");
        //        var httpApplication = sender as HttpApplication;
        //        httpApplication.CompleteRequest();
        //    }
        //}

        public static ROZVRH GetSchedule()
        {
            return (ROZVRH)HttpContext.Current.Cache[RZ_DATA_KEY];
        }

        public static void ImportData()
        {
            XmlSerializer ser = new XmlSerializer(typeof(ROZVRH));
            using (XmlReader reader = XmlReader.Create(HttpContext.Current.Server.MapPath("~/App_Data/rz.xml")))
            {
                HttpContext.Current.Cache[RZ_DATA_KEY] = (ROZVRH)ser.Deserialize(reader);
            }
        }
    }
}