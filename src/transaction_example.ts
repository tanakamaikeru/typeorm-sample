import { AppDataSource } from './data-source';
import { User } from './entity/User';

const createUserObj = (firstName: string, lastName: string, age: number) => {
  return Object.assign(new User(), {
    firstName: firstName,
    lastName: lastName,
    age: age,
  });
};

const saveTwoTime = async () => {
  const userRepo = AppDataSource.manager.getRepository(User);
  console.log('Save two times.');
  const user1 = createUserObj('Maikeru', 'Tanaka', 100);
  const user2 = createUserObj('Mearii', 'Satou', 155);
  await userRepo.save(user1);
  await userRepo.save(user2);
  const inserted = await userRepo.find();
  console.log('Loaded users: ', inserted);
  await userRepo.clear();
  console.log('Truncated.');
};

const saveManySample = async () => {
  const userRepo = AppDataSource.manager.getRepository(User);
  console.log('Save many.');
  const users = [];
  users.push(createUserObj('Maikeru', 'Tanaka', 100));
  users.push(createUserObj('Mearii', 'Satou', 155));
  await userRepo.save(users);
  const inserted = await userRepo.find();
  console.log('Loaded users: ', inserted);
  await userRepo.clear();
  console.log('Truncated.');
};

const saveTwoTimeInTransaction = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const userRepo = transactionalEntityManager.getRepository(User);
      console.log('Save two times on transaction.');
      const user1 = createUserObj('Maikeru', 'Tanaka', 100);
      const user2 = createUserObj('Mearii', 'Satou', 155);
      await userRepo.save(user1);
      await userRepo.save(user2);
      const inserted = await userRepo.find();
      console.log('Loaded users: ', inserted);
      await userRepo.clear();
      console.log('Truncated.');
    },
  );
};

AppDataSource.initialize()
  .then(async () => {
    console.log('########################################################');
    await saveTwoTime();
    console.log('########################################################');
    await saveTwoTimeInTransaction();
    console.log('########################################################');
    await saveManySample();
  })
  .catch((error) => console.log(error));
