import { RefreshToken } from "../models/refreshToken.schema";
import { IRefreshToken } from "../types/refreshToken";

const RefreshTokenRepository = {
  createRefreshToken: async (newToken: IRefreshToken) => {
    try {
      const newRefreshToken = new RefreshToken(newToken)
      await newRefreshToken.save();
    } catch (error) {
      console.log(error)
    }
  },

  findRefreshToken: async (refreshToken: string) => {
    try {
      const token = await RefreshToken.findOne({refreshToken})
      return token
    } catch (error) {
      console.log(error)
    }
  },

  deleteRefreshToken: async (refreshToken: string) => {
    try {
      await RefreshToken.findOneAndDelete({refreshToken})
    } catch (error) {
      console.log(error)
    }
  },

  deleteRefreshTokenByUserId: async (userId: string) => {
    try {
      await RefreshToken.deleteMany({userId})
    } catch (error) {
      console.log(error)
    }
  },
}

export default RefreshTokenRepository