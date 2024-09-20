const app = require("../config/app");
const { Mutation, Query } = require("../utils/graphql");
const graphqlData = require("../utils/graphqlData");
const { firstElement } = require("../utils/helper");
const logger = require("../utils/logger");
const _ = require("lodash");

class ApiRequest {
  constructor(session_name, bot_name) {
    this.session_name = session_name;
    this.bot_name = bot_name;
  }

  async get_access_token(http_client, request_data) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.MutationTelegramUserLogin,
          variables: request_data,
          query: Query.MutationTelegramUserLogin,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting access token (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramUserLogin;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting access token (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting access token: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting access token: ${error.message}`
        );
      }

      return null;
    }
  }

  async validate_query_id(http_client, request_data) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.MutationTelegramUserLogin,
          variables: request_data,
          query: Query.MutationTelegramUserLogin,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async profile_data(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.QueryTelegramUserMe,
          variables: {},
          query: Query.QueryTelegramUserMe,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting profile data (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramUserMe;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting profile data (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting profile data: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting profile data: ${error.message}`
        );
      }

      return null;
    }
  }

  async game_data(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.QueryGameConfig,
          variables: {},
          query: Query.QueryGameConfig,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting game data (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameGetConfig;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting game data (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting game data: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting game data: ${error.message}`
        );
      }

      return null;
    }
  }

  async tapbot_config(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.TapbotConfig,
          variables: {},
          query: Query.TapbotConfig,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting tapbot config (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameTapbotGetConfig;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting tapbot config (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting tapbot config: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting tapbot config: ${error.message}`
        );
      }

      return null;
    }
  }

  async spin_slot_machine(http_client, spinsCount) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.spinSlotMachine,
          variables: { payload: { spinsCount } },
          query: Query.spinSlotMachine,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while spinning slot machine (${data?.errors[0]?.message})`
        );
        return "retry";
      }
      return data?.data?.slotMachineSpinV2;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while spinning slot machine (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while spinning slot machine: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while spinning slot machine: ${error.message}`
        );
      }

      return null;
    }
  }

  async upgrade_boost(http_client, upgradeType) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.telegramGamePurchaseUpgrade,
          variables: { upgradeType },
          query: Query.telegramGamePurchaseUpgrade,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while upgrading boost (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGamePurchaseUpgrade;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while upgrading boost (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while upgrading boost: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while upgrading boost: ${error.message}`
        );
      }

      return null;
    }
  }

  async start_tapbot(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.TapbotStart,
          variables: {},
          query: Query.TapbotStart,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while starting tapbot (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameTapbotStart;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while starting tapbot (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while starting tapbot: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while starting tapbot: ${error.message}`
        );
      }

      return null;
    }
  }

  async claim_tapbot(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.TapbotClaim,
          variables: {},
          query: Query.TapbotClaim,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while claiming tapbot (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameTapbotClaimCoins;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while claiming tapbot (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while claiming tapbot: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while claiming tapbot: ${error.message}`
        );
      }

      return null;
    }
  }

  async apply_boost(http_client, boosterType) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.telegramGameActivateBooster,
          variables: { boosterType },
          query: Query.telegramGameActivateBooster,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while applying boost (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameActivateBooster;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while applying boost (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while applying boost: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while applying boost: ${error.message}`
        );
      }

      return null;
    }
  }

  async send_taps(http_client, request_data) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.MutationGameProcessTapsBatch,
          variables: request_data,
          query: Query.MutationGameProcessTapsBatch,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while sending taps (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameProcessTapsBatch;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while sending taps (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while sending taps: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while sending taps: ${error.message}`
        );
      }

      return null;
    }
  }

  async set_next_boss(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.telegramGameSetNextBoss,
          variables: {},
          query: Query.telegramGameSetNextBoss,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while setting next boss (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.telegramGameSetNextBoss;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while setting next boss (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while setting next boss: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while setting next boss: ${error.message}`
        );
      }

      return null;
    }
  }

  async get_campaigns(http_client) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.CampaignLists,
          variables: {},
          query: Query.CampaignLists,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting campaigns (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.campaignLists?.normal?.filter((item) =>
        item?.description?.toLowerCase()?.includes("youtube")
      );
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting campaigns (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting campaigns: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting campaigns: ${error.message}`
        );
      }

      return null;
    }
  }

  async get_tasks_list(http_client, campaignId) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.GetTasksList,
          variables: { campaignId },
          query: Query.GetTasksList,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting tasks (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.campaignTasks;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting tasks (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting tasks: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting tasks: ${error.message}`
        );
      }

      return null;
    }
  }

  async verify_campaign(http_client, taskConfigId) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.CampaignTaskToVerification,
          variables: { taskConfigId },
          query: Query.CampaignTaskToVerification,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while verifying task (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.campaignTaskMoveToVerificationV2;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while verifying task (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while verifying task: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while verifying task: ${error.message}`
        );
      }

      return null;
    }
  }

  async get_task_by_id(http_client, taskId) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.GetTaskById,
          variables: { taskId },
          query: Query.GetTaskById,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting task by id (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.campaignTaskGetConfig;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while getting task by id (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while getting task by id: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while getting task by id: ${error.message}`
        );
      }

      return null;
    }
  }

  async complete_task(http_client, userTaskId) {
    try {
      const response = await http_client.post(
        app.apiUrl,
        graphqlData({
          mutation: Mutation.CampaignTaskMarkAsCompleted,
          variables: { userTaskId },
          query: Query.CampaignTaskMarkAsCompleted,
        })
      );
      const data = firstElement(response?.data);
      if (!_.isEmpty(data?.errors)) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while completing task (${data?.errors[0]?.message})`
        );
        return null;
      }
      return data?.data?.campaignTaskMarkAsCompleted;
    } catch (error) {
      if (error?.response?.status >= 500 && error?.response?.status <= 599) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Server error while completing task (${error?.message})`
        );
        return null;
      }
      if (error?.response?.data?.message) {
        logger.warning(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ⚠️ Error while completing task: ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error while completing task: ${error.message}`
        );
      }

      return null;
    }
  }
}

module.exports = ApiRequest;