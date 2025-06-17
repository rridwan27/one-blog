import React, { use, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const AddBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loading } = use(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "Technology",
    shortDescription: "",
    longDescription: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const form = new FormData();
  form.append("title", formData.title);
  form.append("shortDescription", formData.shortDescription);
  form.append("longDescription", formData.longDescription);
  form.append("category", formData.category);
  form.append("image", formData.image);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

    console.log("Blog Data:", formData);
    setSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/post/addPost",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      setSubmitting(false);
      navigate("/all-blogs");
    } catch (err) {
      toast.error(err.response.data.message);
      setSubmitting(false);
    }

    navigate("/all-blogs");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

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
      className="flex justify-center items-start min-h-screen py-10 px-4"
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
          Add New Blog
        </Typography>
        <form
          onSubmit={handleSubmit}
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
              src={URL.createObjectURL(formData.image)}
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

export default AddBlog;
