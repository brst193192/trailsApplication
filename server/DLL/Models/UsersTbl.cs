using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class UsersTbl
{
    public int Id { get; set; }

    public string LastName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<FavoriteTrailsTbl> FavoriteTrailsTbls { get; set; } = new List<FavoriteTrailsTbl>();

    public virtual ICollection<TrailsTbl> TrailsTbls { get; set; } = new List<TrailsTbl>();
}
