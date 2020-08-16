using Castle.DynamicProxy.Generators;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
namespace DynamicModal
{
   
    public class DynamicModalAttribute : ActionFilterAttribute
    {
        public DynamicModalAttribute()
        {
            Roles = "";
        
        }
        public string Roles { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            // check  sessions here
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new JsonResult()
                {
                    Data = new DMResult(HttpStatusCode.Unauthorized, "Session Expired!"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                };
                return;
            }

            if (Roles.Trim() != "")
            {
                bool isRestricted = true;
                foreach (var role in Roles.Split(','))
                {
                    if (HttpContext.Current.User.IsInRole(role.Trim()))
                    {
                        isRestricted = false;
                    }
                }

                if (isRestricted)
                {
                    filterContext.Result = new JsonResult()
                    {
                        Data = new DMResult(HttpStatusCode.NonAuthoritativeInformation, "Access Denied!"),
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    };
                    return;
                }
            }


            base.OnActionExecuting(filterContext);
        }
    }

    public class DynamicAlertAttribute : ActionFilterAttribute
    {
        public DynamicAlertAttribute()
        {
            Roles = "";
        }
        public string Roles { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            // check  sessions here
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new JsonResult()
                {
                    Data = new DMResult(HttpStatusCode.Unauthorized, "Session Expired!"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                };

                return;
            }

            if (Roles.Trim() != "")
            {
                bool isRestricted = true;
                foreach (var role in Roles.Split(','))
                {
                    if (HttpContext.Current.User.IsInRole(role.Trim()))
                    {
                        isRestricted = false;
                        break;
                    }
                }

                if (isRestricted)
                {
                    filterContext.Result = new JsonResult()
                    {
                        Data = new DMResult(HttpStatusCode.NonAuthoritativeInformation, "Access Denied!"),
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    };
                    return;
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
 
}
