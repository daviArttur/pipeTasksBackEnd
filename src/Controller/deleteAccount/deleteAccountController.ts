import { NextFunction } from "express";
import { deleteAccountRequestType, deleteAccountResponseType } from "src/interface/deleteAccount/deleteAccountInterface";
import { taskModel } from "../../Models/task/taskModel";
import { userModel } from "../../Models/user/user";

class Controller {
  private userId: string;
  private res: deleteAccountResponseType;
  private next: NextFunction;

  constructor(req: deleteAccountRequestType, res: deleteAccountResponseType, next: NextFunction) {
    this.userId = req.id;
    this.res = res;
    this.next = next;
  }

  private async deleteUser() {
    try {
      const deletedUser = await userModel.deleteOne({ _id: this.userId });
      if (deletedUser.deletedCount !== 1) throw new Error(String(deletedUser.deletedCount));
      return { err: false, content: deletedUser };
    } catch (err) {
      return { err: true, errors: err };
    }
  }

  private async deleteTasks() {
    try {
      const deletedTasks = await taskModel.deleteMany({ userId: this.userId });
      if (!deletedTasks.acknowledged) throw new Error(String(deletedTasks.deletedCount));
      return { err: false, content: deletedTasks };
    } catch (err) {
      return { err: true, errors: err };
    }
  }

  public async delete() {
    try {
      const task = await this.deleteTasks();
      const user = await this.deleteUser();
      if (task.err || user.err) throw new Error(task.errors.message, user.errors.mesage);
      return this.res.status(200).json({
        user: user.content!,
        task: task.content!
      });
    } catch (err) {
      return this.next(err);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err: Error, _req: deleteAccountRequestType, res: deleteAccountResponseType, _next: NextFunction) => {
  return res.status(500).json({ message: err.message });
};

const deleteAcountController = async (req: deleteAccountRequestType, res: deleteAccountResponseType, next: NextFunction) => {
  return await new Controller(req, res, next).delete();
};

export { deleteAcountController, handleErrors };