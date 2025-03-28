/* eslint-disable no-undef */
'use strict';

const Chance = require('chance');
const chance = new Chance();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const uuids = [
			'f95cf3ba-58d8-4774-8c26-6a65243cbe94',
			'8c9ff07b-deea-4d65-b16f-503187fc6ef8',
			'48c969aa-40e9-45a7-9f57-eba353e8ab19',
			'1ba54b71-4a54-4c2a-b129-0d7bbf118282',
			'66fab7f4-0eaa-4149-ad7b-b3d2e6bb3d50',
			'8b4616fc-6907-44e5-8dfb-b50910e4c84d',
			'e88997ab-c880-4d84-979a-355e8b505640',
			'29645ba6-b53e-44fb-883c-2c298f96dfc4',
			'6b8ea32a-663c-419a-afb7-d6c5e6017f62',
			'505e9d68-c1fb-42e8-b7ca-9aa3b765cb66',
			'd86feccd-8cce-49cc-9827-e1e604c71630',
			'8a14108d-48f4-4cc2-82ee-7ec03ef138f9',
			'7096091e-6bee-41e7-a473-23d94d7fdaa0',
			'00db8976-0b9f-4fa3-8373-759b7e41cd58',
			'a647dee9-a992-40de-be10-a08cd2941325',
			'36f1cdf9-8348-4a3a-bca8-d75675e37b1b',
			'6c9733b9-5185-46ac-89f2-3e741623dfdf',
			'c43cc448-41a8-41aa-8be0-c0b19c701643',
			'e8bd50b5-dc01-4f06-8372-c16103768c82',
			'350eb488-5566-4166-b302-e3e83ab34fe8',
			'f3292dc2-e452-4c8d-bfb0-e3ac72b949ea',
			'b83452d1-87be-463c-8b96-db565ada6129',
			'1db82c64-40b0-456d-b2d7-ac083d1e3692',
			'c617b717-ddd3-4139-b17b-27a30cdfb622',
			'40c46595-9c5a-4c3d-bfbc-8676d04ea989',
			'6910e464-f1f3-4bd1-8b76-c967f59e0a82',
			'851a8259-bc5c-4005-bafe-13a37ec81d31',
			'cc85eb35-3c6a-40bf-a24b-347b855956c8',
			'883f7eb6-c170-4799-af3c-0e21afd4c9a5',
			'd7537422-5010-4a29-aa26-6d0aff1fccc9',
			'7953439e-b5b2-4548-8fe9-f56586608b85',
			'9c759989-0b55-42fe-bbc3-e12af4905ddf',
			'50673800-bc3d-4e5c-b44c-2ef4ca05a09e',
			'cfdbc643-b06c-4c7e-a909-ec8cefab18cd',
			'4c2416c2-0873-44d2-beea-dca293263bdf',
			'e2ce930e-272a-4fff-9e3b-34c0b9af7e2a',
			'bc39047d-3a6a-4941-a675-6050d28d6d67',
			'e2cc0083-4a63-40a1-a39f-09b4c9013fac',
			'5d9ff73b-00f2-458b-a800-4e76193a9227',
			'80dafdfc-b76d-4797-ac66-1cf6f3a30880',
			'e926b88e-92b9-4660-b39d-a322912aeb7e',
			'5809b0f5-5ce0-4ab8-b256-61296ed5ef76',
			'95a72668-2ee1-4fb9-a403-9193be456a04',
			'4fd83c42-82d5-408e-b3a3-d0e55f234408',
			'f377db29-aeca-4287-b8c5-27c96d13d896',
			'5dcab102-cb57-49eb-9544-45dc7777a460',
			'c60815f3-dce5-440f-80bb-9e6d5e0df69b',
			'16bf5c83-718e-48a3-bbd2-1d819518df40',
			'5faf0e4b-43f6-4a7d-b823-0603631125d8',
			'be6530c7-714d-4835-91bd-a407a88673c3',
			'3bf4e6cf-aa4e-4733-816e-eb2fea059e99',
			'9b733afa-8997-4474-94b1-b927b550e9df',
			'b2d3ea09-ea7b-4c83-972f-245f527da8ba',
			'8afe968a-98a0-4e38-8a4c-cdc8f8e11344',
			'efdfb68f-66cd-409d-936a-1760651c3345',
			'35958ec6-e5d1-4c6d-9de2-b3a8538ac9ce',
			'2c96d9ab-79b9-41ff-8f9f-a7367d15b04b',
			'bb04c0cc-776a-47b3-a6e5-ec0150b6640f',
			'c390e526-de9d-43d4-869b-7c2b9105396c',
			'5c034e5e-9878-4844-a406-95b4b7516bb1',
			'829065aa-a575-4f9b-8f9f-792e96efd6fb',
			'cc988736-840b-4644-81fd-f2cdcabf3bc3',
			'c46fbd9f-5b2b-487e-bcd8-1d883503bfbc',
			'05c6efd3-9d76-42ba-b0ef-f59d27f92086',
			'f1caf90b-6dbd-44e1-8bec-d0b8af121a1d',
			'664ba07a-5253-471b-aa67-2ed98128119c',
			'f420fef7-c4b3-44fe-81b5-34a82d96c313',
			'2ff881f5-dcf2-474e-8eaf-18c15cdb8e11',
			'da1b6e7b-aef4-46af-9a8e-5f9c4ca740d5',
			'b8280ab7-7693-4314-b68e-a0b247a7da96',
			'38da6dc5-e94b-4d55-b647-1abea28418cc',
			'8d62324f-1d31-4f34-b2ad-c8a35dc5d3a9',
			'10278522-1f65-4bbd-96d8-0fe71f3020a6',
			'df918a9a-7201-46f2-8ac9-821491157944',
			'f86c3290-64eb-4df5-bc49-d94c33970fac',
			'c26c1206-4d5a-476f-aa50-f7c4b47dbeb0',
			'44d66bf6-b533-4d49-a00e-d28709a09a78',
			'44f6b417-1fe5-428c-bc82-293fecb10279',
			'dd4f82e9-b9e3-4f12-880d-bf0f89d7ddf2',
			'd2031410-8571-47bd-8ba0-1863fb1954f4',
			'89fe3c80-144c-4ec2-92bf-f869825d4545',
			'52cc94a6-dce0-4e88-89e3-45b9cca4dc0c',
			'f6cbbee1-554c-4eae-b795-320af81a4693',
			'0241699d-c569-4d86-9e7c-d28709a09a78',
		];
		function generateRandomFeedback(count) {
			return Array.from({ length: count }, () => {
				const randomUuidIndex = Math.floor(
					Math.random() * uuids.length
				);
				const randomUuid = uuids[randomUuidIndex];

				return {
					id: chance.guid(),
					userId: randomUuid, // Assuming the same UUID is used for both id and userId
					comment: chance.sentence({ words: randomUuidIndex }),
					createdAt: chance.date({ year: 2023 }),
					updatedAt: chance.date({ year: 2023 }),
				};
			});
		}
		await new Promise((resolve) => setTimeout(resolve, 10));

		await queryInterface.bulkInsert('Feedback', generateRandomFeedback(50));
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Feedback', null, {});
	},
};

