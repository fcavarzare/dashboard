var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/metrics", () =>
{
    var random = new Random();
    var cpu = random.Next(10, 90);
    var memory = random.Next(20, 95);
    var disk = random.Next(15, 85);
    return new { cpu, memory, disk, timestamp = DateTime.Now };
});

app.Run();
