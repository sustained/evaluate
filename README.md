# evaluate

**e**xtremely **v**aluable **a**ndroid, **l**everaging **u**ltimate **a**lgorithms **t**o **e**valuate (code)

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
