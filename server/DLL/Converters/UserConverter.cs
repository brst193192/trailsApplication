using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DTO.Classes;

namespace DAL.Converters
{
    public class UserConverter
    {
        public static UsersTbl user_ToUserTbl(Users user)
        {
            UsersTbl u=new UsersTbl();
            u.Id=user.Id;
            u.FirstName=user.FirstName;
            u.LastName=user.LastName;
            u.Email=user.Email;
            u.Password=user.Password;
            return u;
        }

        public static Users userTbl_ToUser(UsersTbl userTbl)
        {
            Users u = new Users();
            u.Id = userTbl.Id;
            u.FirstName = userTbl.FirstName;
            u.LastName = userTbl.LastName;
            u.Email = userTbl.Email;
            u.Password = userTbl.Password;
            return u;
        }

        public static List<UsersTbl> users_ToUsersTbl(List<Users> users)
        {
            List<UsersTbl> ul = new List<UsersTbl>();
            foreach (Users u in users)
            {
                ul.Add(user_ToUserTbl(u));
            }
            return ul;
        }

        public static List<Users> usersTbl_ToUsers(List<UsersTbl> users)
        {
            List<Users> ul = new List<Users>();
            foreach (UsersTbl u in users) 
            { 
                ul.Add(userTbl_ToUser(u));
            }
            return ul;
        }
    }
}
