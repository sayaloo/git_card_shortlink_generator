import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nano_id: {
    type: String,
    required: [ true, 'Please provide an ID for this User.' ],
    maxlength: [ 240, 'Name cannot be more than 240 characters' ],
  },
  owner: {
    type: String,
    required: [ true, 'Please provide an Owner for this User.' ],
    maxlength: [ 240, 'Name cannot be more than 240 characters' ],
  },
  repo: {
    type: String,
    required: [ true, 'Please provide an Repo name for this User.' ],
    maxlength: [ 240, 'Name cannot be more than 240 characters' ],
  },
  stars_count: {
    type: Number,
  },
  color: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);