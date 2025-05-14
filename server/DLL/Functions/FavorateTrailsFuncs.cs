using DAL.Converters;
using DAL.Models;
using DTO.Classes;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Functions
{
    public class FavorateTrailsFuncs
    {
        public List<Trails> GetFavoritesByUserId(int userId) {
            List<Trails> trails;
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    trails = TrailConverter.TrailsTbl_ToTrails(_db.FavoriteTrailsTbls.Where(t => t.UserId.Equals(userId)).Include(x => x.Trail).Select(f => f.Trail).ToList());
                }
                return trails;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }   
        }

        public void ChangeFavoriteStatus(int userId, int trailId) 
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    FavoriteTrailsTbl ft = _db.FavoriteTrailsTbls.FirstOrDefault(f => f.TrailId.Equals(trailId) && f.UserId.Equals(userId));
                    if (ft != null)
                        _db.Remove(ft);
                    else
                    {
                        ft = new FavoriteTrailsTbl();
                        ft.TrailId = trailId;
                        ft.UserId = userId;
                        //ft.Trail = TrailConverter.Trail_ToTrailTbl(trail);
                        _db.Add(ft);
                    }
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public async Task DeleteFavoritesOfTraiol(int trailId)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    FavoriteTrailsTbl ft = _db.FavoriteTrailsTbls.FirstOrDefault(f => f.TrailId.Equals(trailId));
                    foreach (FavoriteTrailsTbl f in _db.FavoriteTrailsTbls)
                    {
                        if(f.TrailId==trailId)
                            _db.Remove(f);
                    }             
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public async Task<List<Trails>> GetAllFavorites()
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext()) {
                    return TrailConverter.TrailsTbl_ToTrails(_db.FavoriteTrailsTbls.Include(t=>t.Trail).Select(t=>t.Trail).ToList());
                }
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");

            }
        }
    }
}
