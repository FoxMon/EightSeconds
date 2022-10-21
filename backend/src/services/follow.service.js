const { Follow, User } = require("../models");
const ApiError = require("../utils/ApiError");

module.exports = {

  /**
   * 팔로우 리스트 불러오기
   * 
   * @param {String} userId 유저 아이디
   * @returns 팔로우 중인 친구 리스트
   */
  async getFollowList(userId) {
    const followingInfo = await Follow.find(
      { follower: userId },
      "following"
    ).lean();

    const followList = await Promise.all(
      followingInfo.map((info) => {
        return User.findOne(
          { _id: info.following, withdrawal: false },
          "email nickname description profPic channels"
        ).lean();
      })
    );

    return followList.filter(el => el !== null);
  },

  /**
   * 팔로우 유무 체크
   * 
   * @param {String} userId 유저 아이디
   * @param {String} targetId 상대방 유저 아이디
   * @returns 팔로우 유무
   */
  async confirmFollow(userId, targetId) {
    let isFollowed = true;
    
    const exFollow = await Follow.find({
      $and: [{ follower: userId }, { following: targetId }],
    });

    if (exFollow.length === 0) {
      isFollowed = false;
    }

    return isFollowed;
  },

  /**
   * 팔로우 추가
   * 
   * @param {String} userId 유저 아이디 
   * @param {String} targetId 상대방 유저 아이디
   */
  async createFollow(userId, targetId) {
    // 자기 자신을 친구 추가하면 에러 발생
    if (userId === targetId) {
      throw ApiError.badRequest("자기 자신은 팔로우 할 수 없습니다.");
    }

    // 탈퇴한 유저를 추가할 경우 에러 발생
    const withdrawnUser = await User.findOne({ _id: targetId }, "withdrawal");
    if (withdrawnUser.withdrawal) {
      throw ApiError.badRequest("해당 유저는 탈퇴한 유저입니다.");
    }

    // 이미 친구 추가가 되어있으면 에러 발생
    const exFollow = await Follow.find({
      follower: userId,
      following: targetId,
    });
    if (exFollow.length !== 0) {
      throw ApiError.badRequest("이미 친구로 추가된 유저입니다.");
    }

    // 친구 추가
    await Follow.create({ follower: userId, following: targetId });
  },

  /**
   * 팔로우 삭제
   * 
   * @param {String} userId 유저 아이디
   * @param {String} targetId 상대방 유저 아이디
   */
  async deleteFollow(userId, targetId) {
    await Follow.deleteOne({ follower: userId, following: targetId });
  },

  /**
   * 팔로우/팔로잉 정보 전부 삭제
   * 
   * @param {String} userId 유저 아이디
   */
  async deleteAllFollow(userId) {
    await Follow.deleteMany({ follower: userId });
    await Follow.deleteMany({ following: userId });
  }
};
