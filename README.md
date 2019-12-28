# evaluate

**e**xtremely **v**aluable **a**ndroid, **l**everaging **u**ltimate **a**lgorithms **t**o **e**valuate (code)

## Usage

```
!js [1, 2, 3, 4, 5].reduce((sum, num) => sum + num, 0)
```

## Disclaimer

- Be careful where you run this, if someone nukes your server or machine with it then don't blame me.
- Very very very early/WIP.
- Based heavily on [sbot](https://github.com/raylu/sbot) but will evolve with time.

## Installation

### Install OS dependencies

#### Fedora/RHEL

```sh
sudo dnf install libnl3-devel protobuf-devel protobuf-compiler bison flex
```

#### Other

Good luck with that?

### Build and configure NSJail

```sh
git clone --recursive git://github.com/google/nsjail.git
cd nsjail && make
cd ..
sudo mkdir /sys/fs/cgroup/{memory,pids}
sudo mount -t cgroup memory -o memory /sys/fs/cgroup/memory
sudo mount -t cgroup pids -o pids /sys/fs/cgroup/pids
sudo mkdir /sys/fs/cgroup/{memory,pids}/NSJAIL
sudo chown -R $USER: /sys/fs/cgroup/{memory,pids}/NSJAIL
```

### Install Node Dependencies

```
npm install
```

## Configure environment

```sh
echo "BOT_TOKEN=YOUR BOT TOKEN HERE" >> .env
```

## Run bot

```sh
npm run serve
```
