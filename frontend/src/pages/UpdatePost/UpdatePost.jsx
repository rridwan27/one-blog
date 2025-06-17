import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UploadFile as UploadFileIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const navigate = useNavigate();
  const postData = useLoaderData();
  console.log(postData);

  const { title, imageUrl, category, shortDescription, longDescription } =
    postData;

  const { loading } = use(AuthContext);

  const [formData, setFormData] = useState({
    title: title,
    image: imageUrl,
    category: category,
    shortDescription: shortDescription,
    longDescription: longDescription,
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Politics",
    "Business",
    "Health",
    "Technology",
    "Sports",
    "Travel",
    "Wellness",
    "Lifestyle",
    "Other",
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.image ||
      !formData.shortDescription.trim() ||
      !formData.longDescription.trim() ||
      !formData.category
    ) {
      toast.error("Please fill out all fields and upload an image.");
      return;
    }

    setSubmitting(true);
    try {
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("image", formData.image);
      updatedData.append("category", formData.category);
      updatedData.append("shortDescription", formData.shortDescription);
      updatedData.append("longDescription", formData.longDescription);

      const response = await axios.put(
        `http://localhost:5000/api/v1/post/update/${postData._id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const theme = useTheme();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen"
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 8,
          p: 4,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 3,
          borderRadius: 2,
          marginBottom: 10,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Update Blog
        </Typography>
        <form
          onSubmit={handleUpdate}
          noValidate
          autoComplete="off"
          disabled={submitting}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 100 }}
          />

          <input
            accept="image/*"
            type="file"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            required
          />

          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
              fullWidth
              sx={{ my: 2, border: 1, py: 1 }}
            >
              Upload Image
            </Button>
          </label>

          {formData.image && (
            <img
              src={
                typeof formData.image === "string"
                  ? formData.image
                  : URL.createObjectURL(formData.image)
              }
              alt="Preview"
              style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
            />
          )}

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 200 }}
          />

          <TextField
            label="Long Description"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={6}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: "100%" }}
          >
            {submitting ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader className="w-6 h-6 animate-spin" />{" "}
                  <span>Submitting...</span>
                </div>
              </>
            ) : (
              "Submit Blog"
            )}
          </Button>
        </form>
      </Box>
    </motion.div>
  );
};
export default UpdatePost;
