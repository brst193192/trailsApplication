using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DTO.Classes;

namespace DAL.Converters
{
    public class TrailConverter
    {
        public static TrailsTbl Trail_ToTrailTbl(Trails trail)
        {
            TrailsTbl t = new TrailsTbl();
            t.Id = trail.Id;
            t.Name = trail.Name;
            t.Src = trail.Src;
            t.Description = trail.Description;
            t.MoreInfo = trail.MoreInfo;
            t.HowToCome = trail.HowToCome; 
            t.WaysInTrail = trail.WaysInTrail;
            t.UserId = trail.UserId;
            return t;
        }

        public static Trails TrailTbl_ToTrail(TrailsTbl trailTbl)
        {
            Trails t = new Trails();
            t.Id = trailTbl.Id;
            t.Name = trailTbl.Name;
            t.Src = trailTbl.Src;
            t.Description = trailTbl.Description;
            t.MoreInfo = trailTbl.MoreInfo;
            t.HowToCome = trailTbl.HowToCome;
            t.WaysInTrail = trailTbl.WaysInTrail;
            t.UserId = trailTbl.UserId;
            return t;
        }

        public static List<TrailsTbl> Trails_ToTrailsTbl(List<Trails> trails)
        {
            List<TrailsTbl> tl = new List<TrailsTbl>();
            foreach (Trails t in trails)
            {
                tl.Add(Trail_ToTrailTbl(t));
            }
            return tl;
        }

        public static List<Trails> TrailsTbl_ToTrails(List<TrailsTbl> trails)
        {
            List<Trails> tl = new List<Trails>();
            foreach (TrailsTbl t in trails)
            {
                tl.Add(TrailTbl_ToTrail(t));
            }
            return tl;
        }
    }
}

