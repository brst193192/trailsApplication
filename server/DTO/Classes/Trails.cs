using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Classes
{
    public class Trails
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Src { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string MoreInfo { get; set; } = null!;

        public string HowToCome { get; set; } = null!;

        public string? WaysInTrail { get; set; }

        public int UserId { get; set; }

    }
}
