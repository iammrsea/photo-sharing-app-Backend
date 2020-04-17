const PhotoService = require('../photo/photo.service');
const CommentService = require('../comment/comment.service');
const ProfileService = require('../profile/profile.service');
const ReplyService = require('../reply/reply.service');
const UserService = require('../user/user.service');
const imageService = require('../photo-uploader/uploader.service');

module.exports = {
	userService: new UserService(),
	photoService: new PhotoService(),
	commentService: new CommentService(),
	profileService: new ProfileService(),
	replyService: new ReplyService(),
	imageService,
};
