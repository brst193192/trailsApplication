using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Functions;
using DTO.Classes;

namespace DAL.Converters
{
    public class FavoriteConverter
    {
        public  static FavoriteTrailsTbl FavoriteTrail_TofavoriteTrailTbl(FavoriteTrails favoriteTrail)
        {
            FavoriteTrailsTbl ft = new FavoriteTrailsTbl();
            ft.Id = favoriteTrail.Id;
            ft.UserId = favoriteTrail.UserId;
            ft.TrailId = favoriteTrail.TrailId;
            return ft;
        }

        public  static FavoriteTrails FavoriteTrailTbl_TofavoriteTrail(FavoriteTrailsTbl favoriteTrailTbl)
        {
            FavoriteTrails ft = new FavoriteTrails();
            ft.Id = favoriteTrailTbl.Id;
            ft.UserId = favoriteTrailTbl.UserId;
            ft.TrailId = favoriteTrailTbl.TrailId;
            if(favoriteTrailTbl.Trail != null)
            {
                ft.Trail = TrailConverter.TrailTbl_ToTrail(favoriteTrailTbl.Trail);
            }
            return ft;
        }

        public  static List<FavoriteTrailsTbl> FavoriteTrails_TofavoriteTrailsTbl(List<FavoriteTrails> favoriteTrails)
        {
            List<FavoriteTrailsTbl> trails = new List<FavoriteTrailsTbl>();
            foreach(FavoriteTrails f in favoriteTrails)
            {
                trails.Add(FavoriteTrail_TofavoriteTrailTbl(f));
            }
            return trails;
        }

        public  static List<FavoriteTrails> FavoriteTrailsTbl_TofavoriteTrails(List<FavoriteTrailsTbl> favoriteTrailsTbl) 
        {
            List<FavoriteTrails> trails = new List<FavoriteTrails>();
            foreach (FavoriteTrailsTbl f in favoriteTrailsTbl)
            {
                trails.Add(FavoriteTrailTbl_TofavoriteTrail(f));
            }
            return trails;
        }
    }
}
