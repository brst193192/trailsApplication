using DAL.Converters;
using DAL.Models;
using DTO.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Functions
{
    public class TrailsFuncs
    {
        public List<Trails> GetAllTrails()
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    return TrailConverter.TrailsTbl_ToTrails(_db.TrailsTbls.ToList());
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public Trails GetTrailByTrailId(int id)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    return TrailConverter.TrailTbl_ToTrail(_db.TrailsTbls.FirstOrDefault(t => t.Id == id));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public Trails getTrailByName(string name)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    return TrailConverter.TrailTbl_ToTrail(_db.TrailsTbls.FirstOrDefault(t => t.Name == name));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }
        
        public List<Trails> GetTrailsByUserId(string id)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    return TrailConverter.TrailsTbl_ToTrails(_db.TrailsTbls.Where(t => t.UserId.Equals(id)).ToList());
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }
        
        public void AddTrailToDB(Trails trail)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    _db.Add(TrailConverter.Trail_ToTrailTbl(trail));
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public void UpdateTrailInDB(Trails updTrail)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    TrailsTbl t = _db.TrailsTbls.FirstOrDefault(t => t.Id.Equals(updTrail.Id));
                    if (t != null)
                    {
                        t.Name = updTrail.Name;
                        t.Src = updTrail.Src;
                        t.Description = updTrail.Description;
                        t.MoreInfo = updTrail.MoreInfo;
                        t.HowToCome = updTrail.HowToCome;
                        t.WaysInTrail = updTrail.WaysInTrail;
                        t.UserId = updTrail.UserId;
                        _db.TrailsTbls.Update(t);
                        _db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " / error in DAL-Functions layer");
            }
        }

        public void DeleteTraiFromDB(int id)
        {
            try
            {
                using (TrailsDbContext _db = new TrailsDbContext())
                {
                    TrailsTbl t = _db.TrailsTbls.FirstOrDefault(t => t.Id==id);
                    _db.TrailsTbls.Remove(t);
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
