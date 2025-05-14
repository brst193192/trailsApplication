using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Classes
{
    public class FavoriteTrails
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int TrailId { get; set; }

        public Trails Trail { get; set; } = null!;

    }
}
