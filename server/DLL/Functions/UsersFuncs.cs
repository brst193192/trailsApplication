using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DTO.Classes;
using DAL.Converters;
using DAL.Models;

namespace DAL.Functions
{
    public class UsersFuncs
    {
        public async Task<List<Users>> GetAllUsers()
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    //כאן היה לו באג אחרי שעדכנתי שהשרת שלו זה השרת במחשב שלי
                    //return UserConverter.usersTbl_ToUsers(_db.UsersTbl.ToList());
                    return UserConverter.usersTbl_ToUsers(_db.UsersTbls.ToList());
                }
            }
            catch
            {
                throw new Exception("error in DAL-Functions layer");
            }
        }

        public async Task AddUser(Users user)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    _db.Add(UserConverter.user_ToUserTbl(user));
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

    }
}
