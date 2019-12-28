import { Client } from "discord.js"
import { spawn } from "child_process"
import { join, dirname, resolve } from "path"

const { BOT_TOKEN } = process.env
const CHROOT_DIR = join(dirname(resolve(__filename)), "chroot")
const COMMAND_PREFIX = "!"

console.log(CHROOT_DIR)

const MAX_MEMORY = 128 * 1024 * 1024
const MAX_PROCESSES = 10
const TIME_LIMIT = 2

const client = new Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content.substr(0, COMMAND_PREFIX.length) !== COMMAND_PREFIX) {
    return
  }

  let [command, ..._] = msg.content.split(" ")
  command = command.substring(COMMAND_PREFIX.length)
  let code = msg.content.substring(command.length + COMMAND_PREFIX.length + 1).trim()

  if (command === "js") {
    const proc = spawn("nsjail/nsjail", [
      "-Mo",
      "--rlimit_as",
      "700",
      "--chroot",
      CHROOT_DIR,
      "-R/usr",
      "-R/lib",
      "-R/lib64",
      "--user",
      "nobody",
      "--group",
      "99999", // Doesn't work with "nobody" - why?
      "--time_limit",
      TIME_LIMIT,
      "--disable_proc",
      "--iface_no_lo",
      "--cgroup_mem_max",
      MAX_MEMORY,
      "--cgroup_pids_max",
      MAX_PROCESSES,
      "--quiet",
      "--",
      "/usr/bin/node",
      "--print",
      code,
    ])

    proc.stdout.on('data', (data) => {
      msg.reply("```" + data + "```");
    });

    proc.stderr.on('data', (error) => {
      msg.reply(`Sorry, an error occured.`);
      console.error(error)
    });

    proc.on('close', (code) => {
      console.debug(`Child process exited with code ${code}`);
    });
  }
})

client.login(BOT_TOKEN)
