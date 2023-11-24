using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace DentalManagementSystem.Controllers
{
    [Route("[controller]")]
    public class ImageController :ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment=webHostEnvironment;
        }

        [HttpPost("SaveImage/{folder}")]
        public async Task<IActionResult> UploadImage(string folder)
        {
            bool results = false;
            try
            {
                var uploadFiles = Request.Form.Files;
                foreach (IFormFile formFile in uploadFiles)
                {
                    string filename = formFile.FileName;
                    string Filepath = GetFilePath(filename, folder);
                    if (!System.IO.Directory.Exists(Filepath))
                    {
                        System.IO.Directory.CreateDirectory(Filepath);
                    }
                    string imagepath = Filepath + "\\image.png";
                    if (System.IO.File.Exists(imagepath))
                    {
                        System.IO.File.Delete(imagepath);
                    }
                    using (FileStream stream = System.IO.File.Create(imagepath))
                    {
                        await formFile.CopyToAsync(stream);
                        results = true;
                    }
                }
              
            }
            catch (Exception)
            {

                throw;
            }
            return Ok(results);
        }

        [NonAction]
        private string GetImage(string Identity, string folder)
        {
            string ImageUrl = string.Empty;
            string HostUrl = "https://localhost:7106/";
            string Filepath = GetFilePath(Identity, folder);
            string Imagepath = Filepath + "\\image.png";
            if (!System.IO.File.Exists(Imagepath))
            {
                ImageUrl = HostUrl + "/uploads/common/noimage.png";
            }
            else
            {
                ImageUrl = HostUrl + $"/uploads/"+ folder+ "/"+ Identity + "/image.png";
            }
            return ImageUrl;
        }

        //[HttpGet("RemoveImage/{folder}&{identity}")]
        //public string RemoveImage(string doctorIdentity)
        //{
        //    string result = "notDeleted Yet";
        //    string Filepath = GetFilePath(Identity, )
        //    string Imagepath = Filepath + "\\image.png";
        //    try
        //    {
        //        if (System.IO.File.Exists(Imagepath))
        //        {
        //            System.IO.File.Delete(Imagepath);
        //            result  = "deleted";
        //        }
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //}


        [NonAction]
        private string GetFilePath(string Identity, string folder)
        {
            return _webHostEnvironment.WebRootPath + $"\\Uploads\\{folder}\\" + Identity;
        }

    }
}
