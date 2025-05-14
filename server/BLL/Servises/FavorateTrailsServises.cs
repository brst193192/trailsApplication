using DAL.Converters;
using DAL.Functions;
using DAL.Models;
using DTO.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servises
{
    public class FavorateTrailsServises
    {
        public async Task<List<Trails>> GetFavoritesByUser(int id)
        {
            try
            {
                FavorateTrailsFuncs _dal = new FavorateTrailsFuncs();
                return  _dal.GetFavoritesByUserId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer"); 
            }
        }

        public async Task ChangeStatus(int userId, int trailId)
        {
            try
            {
                FavorateTrailsFuncs _dal = new FavorateTrailsFuncs();
                 _dal.ChangeFavoriteStatus(userId, trailId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer");
            }
        }

        public async Task<List<Trails>> GetHot()
        {
            try
            {
                FavorateTrailsFuncs _dal_favorite = new FavorateTrailsFuncs();
                TrailsFuncs _dal_trails = new TrailsFuncs();

                List<Trails> allFavoriteTrails=await _dal_favorite.GetAllFavorites();
                List<Trails> allTrailsList = _dal_trails.GetAllTrails();
                List<Trails> hotTrails = new List<Trails>();
                int[] amount=new int[allTrailsList.Count()];

                //מילוי מערך מקביל עבור כל טיול כמה פעמים מופיע במועדפים
                for (int i = 0; i < allTrailsList.Count; i++)
                    amount[i]=(allFavoriteTrails.Where(t => t.Id == allTrailsList[i].Id).Count());
                int max = 0;
                int imax = -1;
                //מציאת חמשת החמים ביותר
                for (int i = 0; i < 5; i++)
                {
                    for (int j = 0; j < allTrailsList.Count(); j++)
                        if (amount[j] > max)
                        {
                            max = amount[j];
                            imax = j;
                        }
                    hotTrails.Add(allTrailsList[imax]);
                    max = 0;
                    amount[imax] = 0;
                    imax = -1;
                }
                return hotTrails;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in webApi layer");
            }
        }
    }
}
