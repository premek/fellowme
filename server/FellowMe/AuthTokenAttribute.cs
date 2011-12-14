using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FellowMe
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class AuthTokenAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var header = filterContext.RequestContext.HttpContext.Request.Headers["FellowMeToken"];
            if (header == null)
            {
                Fail(filterContext);
                return;
            }

            var token = filterContext.HttpContext.Application[header];

            if (token == null)
            {
                Fail(filterContext);
                return;
            }

            if((DateTime)token < DateTime.Now)
            {
                //expired
                filterContext.HttpContext.Application.Remove(header);
                Fail(filterContext);
                return;
            }

            //succeed
        }


        private void Fail(ActionExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.StatusCode = 403;

            filterContext.Result = new JsonResult()
            {
                Data = new { success = false },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}