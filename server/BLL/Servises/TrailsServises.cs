using DAL.Converters;
using DAL.Functions;
using DAL.Models;
using DTO.Classes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servises
{
    public class TrailsServises
    {
        public async Task<List<Trails>> GetAll()
        {
            try
            {
                TrailsFuncs _dal = new TrailsFuncs();
                return  _dal.GetAllTrails();
            }
            catch (Exception ex) { throw new Exception(ex.Message + " / error in BLL layer"); }
        }

        public async Task<Trails> AddTrail(Trails trail)
        {
            TrailsFuncs _dal = new TrailsFuncs();
            try
            {
                 _dal.AddTrailToDB(trail);
                return  _dal.getTrailByName(trail.Name);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer"); 
            }
        }

        public async Task Delete(int trailId)
        {
            TrailsFuncs _dal_trails = new TrailsFuncs();
            FavorateTrailsFuncs _dal_favorites = new FavorateTrailsFuncs();
            try
            {
                await _dal_favorites.DeleteFavoritesOfTraiol(trailId);
                 _dal_trails.DeleteTraiFromDB(trailId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in BLL layer");
            }
        }

        public async Task Update(Trails trail)
        {
            TrailsFuncs _dal = new TrailsFuncs();
            try
            {
                _dal.UpdateTrailInDB(trail);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " /error in BLL layer");    
            }
        }
    }
}
