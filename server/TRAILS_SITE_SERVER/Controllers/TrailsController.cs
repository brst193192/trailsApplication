using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL.Servises;
using System.Drawing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Forms;
using DTO.Classes;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("trails/")]
    public class TrailsController : ControllerBase
    {
        [HttpGet]
        [Route("getAll")]
        public async Task<List<Trails>> GetTrails()
        {
            TrailsServises _bll = new TrailsServises();
            try
            {
                return await _bll.GetAll();
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message + " / error in webApi layer"); 
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<Trails> AddNewTrail(Trails t)
        {
            TrailsServises _bll = new TrailsServises();
            try
            {
                return await _bll.AddTrail(t);
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message + " / error in webApi layer");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task DeleteTrail(int id)
        {
            TrailsServises _bll = new TrailsServises();
            try
            {
                await _bll.Delete(id);
            }
            catch (Exception ex) { throw new Exception(ex.Message + " / error in webApi layer");}
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateTrail(Trails t)
        {
            TrailsServises _bll = new TrailsServises();
            try
            {
                await _bll.Update(t);
            }
            catch (Exception ex) { throw new Exception(ex.Message + " / error in webApi layer");}
        }
    }  
}
