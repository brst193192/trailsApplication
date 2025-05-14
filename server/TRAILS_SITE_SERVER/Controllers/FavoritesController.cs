using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL.Servises;
using System.Drawing;
using Microsoft.AspNetCore.Components.Forms;
using DTO.Classes;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("favorites/")]
    public class FavoriteController : ControllerBase
    {
        [HttpGet]
        [Route("getMyFavorites/{userId}")]
        public async Task<List<Trails>> GetFavorites(int userId)
        {
            try
            {
                FavorateTrailsServises _bll = new FavorateTrailsServises();
                return await _bll.GetFavoritesByUser(userId);
            }
            catch (Exception ex) 
            { 
                throw new Exception(ex.Message + " / error in webApi layer"); 
            }
        }


        [HttpPut]
        [Route("changeStatus/{userId}/{trailId}")]
        public async Task ChangeStatus(int userId, int trailId)
        {
            try
            {
                FavorateTrailsServises _bll = new FavorateTrailsServises();
                await _bll.ChangeStatus(userId, trailId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in webApi layer");
            }
        }

        [HttpGet]
        [Route("hotTrails")]
        public async Task<List<Trails>> GetHotTrails()
        {
            try
            {
                FavorateTrailsServises _bll = new FavorateTrailsServises();
                return await _bll.GetHot();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in webApi layer");
            }
        }
    }
}
