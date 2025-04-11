const mongoose = require('mongoose');
const app = require('./src/app');
const PORT = process.env.PORT || 8001;

mongoose.connect('mongodb+srv://Hargunsingh:admin14@cluster0.jemheyn.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0', {
})
.then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
});
