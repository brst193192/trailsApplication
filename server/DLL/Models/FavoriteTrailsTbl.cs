using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class FavoriteTrailsTbl
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int TrailId { get; set; }

    public virtual TrailsTbl Trail { get; set; } = null!;

    public virtual UsersTbl User { get; set; } = null!;
}
