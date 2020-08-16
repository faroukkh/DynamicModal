using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DynamicModal.Startup))]
namespace DynamicModal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
