using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL.Servises;
using System.Drawing;
using Microsoft.AspNetCore.Components.Forms;
using DTO.Classes;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("users/")]
    public class UsersController : ControllerBase
    {
        [HttpGet("login/{email}/{password}")]
        public async Task<Users> Login(string email, string password)
        {
            try
            {
                UsersServises _bll = new UsersServises();
                return await _bll.GetByEmailAndPassword(email, password);
            }
            catch (Exception ex) { throw new Exception(ex.Message + "error in webApi layer"); }
        }

        [HttpPost]
        [Route("register")]
        public async Task<Users> Register(Users user)
        {
            try
            {
                UsersServises _bll = new UsersServises();
                return await _bll.SetNewUser(user);
            }
            catch (Exception ex) { throw new Exception(ex.Message + " / error in webApi layer"); }
        }
    }
}
