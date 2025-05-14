using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TrailsTbl
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Src { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string MoreInfo { get; set; } = null!;

    public string HowToCome { get; set; } = null!;

    public string? WaysInTrail { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<FavoriteTrailsTbl> FavoriteTrailsTbls { get; set; } = new List<FavoriteTrailsTbl>();

    public virtual UsersTbl User { get; set; } = null!;
}
