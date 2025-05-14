using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Converters;
using DTO.Classes;
using DAL.Functions;

namespace BLL.Servises
{
    public class UsersServises
    {
        public async Task<Users> GetByEmailAndPassword(string email, string password)
        {
            try
            {
                UsersFuncs _dal = new UsersFuncs();
                List<Users> users = await _dal.GetAllUsers();
                return users.FirstOrDefault(u => u.Email.Equals(email) && u.Password.Equals(password));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer");
            }
        }

        public async Task<Users> SetNewUser(Users u)
        {
            try
            {
                UsersFuncs _dal = new UsersFuncs();
                await _dal.AddUser(u);
                return await GetByEmailAndPassword(u.Email, u.Password);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer");
               
            }
        }

    }
}
