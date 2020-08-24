using DynamicModal.ViewModels;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DynamicModal
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Position { get; set; }
    }


    public static class Helper
    {
        public static CodeViewerVM GetCodesByName(this Controller controller, string ExampleFolderName)
        {
            Path.GetFullPath("~/Codes/csharp/");
            string physicalPath = controller.HttpContext.Request.MapPath(@"~\Codes\");

            var csharp = File.ReadAllText(string.Format(@"{0}\{1}\csharp.txt", physicalPath, ExampleFolderName));
            var html = File.ReadAllText(string.Format(@"{0}\{1}\html.txt", physicalPath, ExampleFolderName));
            var js = File.ReadAllText(string.Format(@"{0}\{1}\js.txt", physicalPath, ExampleFolderName));

            CodeViewerVM codeViewerVM = new CodeViewerVM()
            {
                CSharpCode = csharp,
                HTMLCode = html,
                JSCode = js
            };

            return codeViewerVM;

        }

        private static List<Employee> EmployeeList()
        {

            List<Employee> employees = new List<Employee>();

            employees.Add(new Employee() { Id = 1, FirstName = "Farouk1", LastName = "Elkhabbaz", Position = ".Net Full-Stack Developer" });
            employees.Add(new Employee() { Id = 2, FirstName = "Farouk2", LastName = "Elkhabbaz", Position = ".Net Full-Stack Developer" });
            employees.Add(new Employee() { Id = 3, FirstName = "Farouk3", LastName = "Elkhabbaz", Position = ".Net Full-Stack Developer" });
            employees.Add(new Employee() { Id = 4, FirstName = "Farouk4", LastName = "Elkhabbaz", Position = ".Net Full-Stack Developer" });

            return employees;
        }



        public static List<Employee> Employees()
        {
            if (HttpContext.Current.Request.Cookies["Employees"] != null)
            {
                var base64EncodedBytes = System.Convert.FromBase64String(HttpContext.Current.Request.Cookies["Employees"].Value);  
                return JsonConvert.DeserializeObject<List<Employee>>(System.Text.Encoding.UTF8.GetString(base64EncodedBytes));
            }
            else
            {
                UpdateEmployeeList(EmployeeList());
                return EmployeeList();
            }
        }
        public static void UpdateEmployeeList(List<Employee> employees)
        {
            string json = JsonConvert.SerializeObject(employees, Formatting.Indented);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(json);          

            HttpContext.Current.Response.Cookies["Employees"].Value =  System.Convert.ToBase64String(plainTextBytes);          

        }

        public static void UpdateEmployee(Employee employee)
        {
            var currList = Employees();

           var currEmp = currList.Where(x => x.Id == employee.Id).FirstOrDefault();

            currEmp.FirstName = employee.FirstName;
            currEmp.LastName = employee.LastName;
            currEmp.Position = employee.Position;
            

            string json = JsonConvert.SerializeObject(currList, Formatting.Indented);

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(json);

            HttpContext.Current.Response.Cookies["Employees"].Value = System.Convert.ToBase64String(plainTextBytes); 

        }




    }
}