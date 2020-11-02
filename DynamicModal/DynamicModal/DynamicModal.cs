using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace DynamicModal
{

    public class DMResult : HttpStatusCodeResult
    {
        public DMResult(HttpStatusCode statusCode, string statusDescription) : base(statusCode, statusDescription)
        {

        }

        public DMResult(HttpStatusCode statusCode, string statusDescription, string html) : base(statusCode, statusDescription)
        {
            this.HTML = html;

        }
        public string HTML { get; set; }
    }
    public static class DM
    {
        public static ActionResult DMSuccess(string message)
        {

            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.OK, message),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }
        public static ActionResult DMSuccessPartialView(this Controller controller, string viewName, object model, string message = "")
        {
            JsonResult json = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            var html = "";


            if (controller == null || controller.ControllerContext == null)
            {
                var data = new DMResult(HttpStatusCode.InternalServerError, "Extension method called on a null controller");
                json.Data = data;
                return json;
            }

            controller.ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                //exception... look in Jun10
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData, controller.TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(controller.ControllerContext, viewResult.View);
                html = sw.GetStringBuilder().ToString();
            }


            json.Data = new DMResult(HttpStatusCode.OK, message, html);
            return json;
        }


        public static ActionResult DMError(string message = "Error Occured while processing your request!")
        {

            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.InternalServerError, message),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }
        public static ActionResult DMRedirect(string url)
        {
            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.Redirect, url),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }

    }
    public static class DA
    {
        public static ActionResult DASuccess(string message)
        {

            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.OK, message),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }
        public static ActionResult DARedirect(string url)
        {
            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.Redirect, url),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }
        public static ActionResult DAError(string message = "Error Occured while processing your request!")
        {

            JsonResult json = new JsonResult()
            {
                Data = new DMResult(HttpStatusCode.InternalServerError, message),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
            return json;
        }






    }
     
}