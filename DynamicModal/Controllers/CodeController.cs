using DynamicModal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DynamicModal.Controllers
{
    public class CodeController : Controller
    {
        // GET: Codes
        [HttpGet]
        public ActionResult Index()
        {
            var employees = Helper.Employees();
            return View(employees);
        }

 

        public ActionResult SimpleDMShowDetails(int id)
        {
            var employee = Helper.Employees().Where(x => x.Id == id).FirstOrDefault();
            return PartialView("_SimpleDMShowDetails", employee);
        }


        [HttpGet]
        public ActionResult EditModal(int id)
        {
            var employee = Helper.Employees().Where(x => x.Id == id).FirstOrDefault();
            return PartialView(employee);
        }

        [HttpPost]
        public ActionResult EditModal(Employee employee)
        {
            Helper.UpdateEmployee(employee);
            
            return DM.DMSuccessPartialView(this, "_EmployeeRowWithEditBtn", employee, "Record has been updated Successfully!");
        }






        public ActionResult ShowDetailsWithEditButton(int id)
        {
            var employee = Helper.Employees().Where(x => x.Id == id).FirstOrDefault();
            return PartialView("_ShowDetailsWithEditButton", employee);
        }

        [HttpGet]
        public ActionResult EditModal2(int id)
        {
            var employee = Helper.Employees().Where(x => x.Id == id).FirstOrDefault();
            return PartialView("EditModal",employee);
        }

        [HttpPost]
        public ActionResult EditModal2(Employee employee)
        {           

            Helper.UpdateEmployee(employee);

            return DM.DMSuccessPartialView(this, "_EmployeeRowWithViewEditBtn", employee, "Record has been updated Successfully!");
        }








        public ActionResult CodeViewer(string name)
        {
            CodeViewerVM codeViewerVM = new CodeViewerVM();
          
            codeViewerVM = Helper.GetCodesByName(this, name);

            return PartialView("_CodePreview", codeViewerVM);
        }




    }
}