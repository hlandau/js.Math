import Int64 from "./Int64";
import * as chai from "chai";
chai.should();

describe('Int64', () => {
  it('should compare signed values correctly', () => {
    const v0  = Int64.make(0, 0);
    const v1  = Int64.make(1, 0);
    const v_1 = Int64.make(0xFFFFFFFF, 0xFFFFFFFF);
    v_1.toString().should.equal('-1');
    Int64.make(0xFFFFFFFE, 0xFFFFFFFF).toString().should.equal('-2');
    Int64.ge(v0, v_1).should.equal(true);
    Int64.ge(v0, v0).should.equal(true);
    Int64.ge(v_1, v_1).should.equal(true);
    Int64.ge(v_1, v0).should.equal(false);
    Int64.ge(v1, v0).should.equal(true);
    Int64.ge(v0, v1).should.equal(false);
    Int64.ge(v1, v_1).should.equal(true);
    Int64.ge(v_1, v1).should.equal(false);
  });

  it('should multiply/divide correctly', () => {
    const items: [number, number, number, number, number, number, number, number][] = [
      [0,0,  0,0,  0,0,  0,0],
      [1,0,  0,0,  0,0,  0,0],
      [0,0,  1,0,  0,0,  0,0],
      [1,0,  1,0,  1,0,  1,0],

      // Randomly generated test vectors
      [0x9f3d6d1c,0x93e4603a, 0x664d9e1f,0xb3f95899, 0x2b337e64,0x26940a10, 0x00000000,0x00000000],
      [0xc2984830,0x80ca1bb0, 0xd68930a9,0x8c984342, 0xc5c0a7b0,0xa1880863, 0x00000000,0x00000000],
      [0x9d3ed7f8,0x29b7319a, 0xe6f1e535,0x74ebba17, 0xe5ab8e58,0x8858a925, 0x00000000,0x00000000],
      [0x10d802d9,0x0c26e439, 0x36cf6abe,0x811b8e5b, 0x04f6f70e,0x274f93bb, 0x00000000,0x00000000],
      [0x5d560faf,0xef840a64, 0x37bc2679,0xf895c134, 0x018563b7,0x80def669, 0x00000000,0x00000000],
      [0xbde9cf4e,0xa3f323c0, 0x8a29ab09,0x78ae2dc5, 0x1a2f63be,0x820db1da, 0x00000001,0x00000000],
      [0x3aadb6a4,0x33a9d713, 0xe2333751,0xf4a0bbe7, 0x0de005e4,0xf63dd485, 0x00000000,0x00000000],
      [0x0f9fb4a6,0x3b1c042b, 0xacc8ddb0,0x3ce450e1, 0x466f8020,0x72a93222, 0x00000000,0x00000000],
      [0x7d47ba12,0xaa2fc2d1, 0x1e4e4d58,0x8cf9fd05, 0x711b6030,0xef52fab4, 0x00000001,0x00000000],
      [0xd5d80886,0xd6876736, 0xe2dbdf6b,0x6767e628, 0x275a4a02,0x2b864878, 0x00000002,0x00000000],
      [0xdcb187f4,0x67aa630a, 0x1609d81f,0x6647ecc3, 0x43c9568c,0x6cc7ab4f, 0x00000001,0x00000000],
      [0xa56e4805,0x01cb20f9, 0xea65df64,0x92078370, 0xabc97cf4,0x7a047c26, 0x00000000,0x00000000],
      [0xd6df5ae8,0x224fad26, 0x24ce5a49,0xffde3eed, 0x92567c28,0x890bb0e9, 0x00000000,0x00000000],
      [0x62884f8a,0xec8dd91b, 0x090c8b8f,0x8fe23255, 0xa1cc5c16,0xf07ceacd, 0x00000001,0x00000000],
      [0xd8cc2df5,0x65845678, 0xb959f0fe,0xd9a0ec46, 0x8cd84916,0x17607056, 0x00000000,0x00000000],
      [0xda74f55f,0x48223d00, 0x1ecc376a,0x561bddb0, 0x3ed90256,0xe2d0ef8e, 0x00000000,0x00000000],
      [0x439732eb,0xfaf81ee8, 0xdf534d9c,0xe91a78ab, 0xe1a4b634,0xfd687c36, 0x00000001,0x00000000],
      [0x3a372dbe,0x082eaf84, 0xd52a9669,0x4635e3bd, 0xcc9b16ee,0xdac12cba, 0x00000000,0x00000000],
      [0xd1ddb702,0xfc1a61ac, 0xa633e59a,0x2f8ad41a, 0x557ae134,0xb7e82bbc, 0x00000005,0x00000000],
      [0x2b44fefc,0xc2671d4c, 0xe6986a94,0x05a31c7e, 0x6317c1b0,0x08253809, 0x00000022,0x00000000],
      [0x40f44750,0x46bb1097, 0xcc3eb805,0x1c3ddb3a, 0xdd66e490,0xd06205c0, 0x00000002,0x00000000],
      [0x2d5c2a22,0xb603c3fb, 0x2288bbc6,0xd36e0008, 0x4e1f6c4c,0x8c05b606, 0x00000000,0x00000000],
      [0x6d15eb8e,0x05c81930, 0xc542d984,0xf75cd079, 0xd494d338,0x62bcbd78, 0x00000000,0x00000000],
      [0xe4f613d2,0x487b46f9, 0xed1262a2,0xaa2506c6, 0xe612eee4,0x91dcbddb, 0x00000000,0x00000000],
      [0x556c90bd,0xee0e1d7d, 0x5e763f52,0x03f44700, 0x3182df8a,0x9e32f25b, 0x0000003c,0x00000000],
      [0x87cca914,0xf7329a26, 0xd56311d6,0x150213d1, 0x230baab8,0xb137bd61, 0x0000000b,0x00000000],
      [0xbd4edc0a,0x60943b73, 0xb757cbcc,0x71176204, 0x50b945f8,0xc64a2098, 0x00000000,0x00000000],
      [0xf0451e6c,0x9637390f, 0xf85414dd,0x59340ffa, 0x6d7bb33c,0x92575726, 0x00000001,0x00000000],
      [0xf130d271,0x6c4e7241, 0xdf215469,0x49aac8ab, 0x81a46459,0x8d52f846, 0x00000001,0x00000000],
      [0xd532af17,0x8497a7f7, 0xcc445503,0xf96d0c6a, 0x29d6b045,0x9741da34, 0x00000000,0x00000000],
      [0x817613e8,0xae1700ff, 0xc8bf2c26,0x7062a400, 0x9d0ad470,0xeaec86d3, 0x00000001,0x00000000],
      [0x7eef818b,0xfe29eef7, 0x0cc85e13,0x274109a2, 0x15efa751,0x5e92df20, 0x00000006,0x00000000],
      [0xc91437b0,0xed482d56, 0xd442f5ed,0x5f90de2a, 0x9c62fdf0,0x76b65ffc, 0x00000002,0x00000000],
      [0xd5fc09ce,0x037e0081, 0xe0530dc9,0x93db2b51, 0x3d2d28be,0xa0e89b48, 0x00000000,0x00000000],
      [0x75d0f70d,0x16bf7df9, 0x580cb534,0x3d1e598f, 0xb9ba5fa4,0x2d4bd6f3, 0x00000000,0x00000000],
      [0x6cda6100,0x4656e316, 0x7bdb5c74,0xddceeae0, 0xc8cff400,0x0d35e0b3, 0x00000000,0x00000000],
      [0xb1f75e76,0x70cdf13b, 0xb44636d5,0x1d824839, 0x0d027c2e,0xc4421e8a, 0x00000003,0x00000000],
      [0x917f46c8,0x61e49fa8, 0x150b6eef,0xe2a4ac00, 0xf8d504b8,0xbce78e2a, 0x00000000,0x00000000],
      [0xa29b8c32,0x93dda456, 0xa26be1f4,0xdaaed19f, 0xef5f91a8,0x19da1246, 0x00000000,0x00000000],
      [0x8eb4bc24,0xe99ad7fb, 0x244ea60f,0x4a9d7fca, 0xf18e5e1c,0x54dcfc34, 0x00000003,0x00000000],
      [0x4c579e8d,0x6bcf5db2, 0x3e4b1412,0xe1b2e141, 0xcfdb29ea,0xf943495e, 0x00000000,0x00000000],
      [0x679b2842,0xad47c5fe, 0x4a9e77ec,0x36dddec9, 0x8f7bcad8,0x6ae06be8, 0x00000003,0x00000000],
      [0x4c1b8840,0xd06b9fc1, 0xf7fbba50,0x2075b27b, 0x20591400,0x71df83e8, 0x00000006,0x00000000],
      [0xae150377,0x8469d25a, 0xaa7fba55,0xb2d28ed9, 0xcf879c83,0x39e8fd2f, 0x00000000,0x00000000],
      [0xc67bba0c,0x4a9e7086, 0xdb3c2b48,0x4dd396fa, 0x79dc5760,0x8c935e1e, 0x00000000,0x00000000],
      [0xc2d21fd3,0x6d9e9266, 0xc7243510,0x4e883653, 0x2c64ac30,0xd50bfc74, 0x00000001,0x00000000],
      [0x95a37e4f,0xa9cf70b7, 0x6b4e7724,0x21437585, 0x8bc67c1c,0x1663d806, 0x00000005,0x00000000],
      [0xb5353809,0x0852c460, 0xd726029a,0xf787b52a, 0x4cc9c76a,0x9cf60a07, 0x00000000,0x00000000],
      [0xe975b7d0,0x66fe4430, 0x25548740,0x764f027c, 0xd19ca400,0xe0f61e48, 0x00000000,0x00000000],
      [0xf7259ff8,0xb55fd0d5, 0x4e2ce5ac,0xaaee5b5d, 0xc40052a0,0x395bec23, 0x00000001,0x00000000],
      [0x8f741d63,0x9abe0976, 0x7e867ff7,0x989a154b, 0x1f6e7785,0xe5b2eace, 0x00000001,0x00000000],
      [0xd4bf9193,0xe7957ff3, 0xf380853b,0xd1e649d3, 0xe147ebe1,0x3f4448d9, 0x00000001,0x00000000],
      [0xe448aae1,0x6736021e, 0xffadd679,0xa4962cb9, 0x3e3dda59,0xdc49a359, 0x00000000,0x00000000],
      [0xbefa1570,0x9fac8e7a, 0x45c9fa2d,0x1655987a, 0xcfd524b0,0xc66afb95, 0x00000007,0x00000000],
      [0xa2f5228e,0x75f40feb, 0x71a587d3,0x032848a0, 0x88ca5d0a,0x0d7a2726, 0x00000025,0x00000000],
      [0xfe46f64f,0x8cedf229, 0x0c9a4f80,0x5fb38df4, 0xe9038880,0x856b9afe, 0x00000001,0x00000000],
      [0xe8e16c46,0x52e86c82, 0x70ea2ce0,0x42f96e95, 0x1bd6c540,0xb76108bc, 0x00000001,0x00000000],
      [0x02e0fb13,0x7600b337, 0xa9a06482,0x80d13a36, 0xcf32eba6,0x947f156d, 0x00000000,0x00000000],
      [0x8bab0853,0x5d2c609f, 0xa84bf587,0x53291b46, 0x3e79d2c5,0x1635d511, 0x00000001,0x00000000],
      [0xc451e8fa,0x734610f3, 0xfd2f56a9,0x3bbdf80f, 0xf63cc90a,0x21c9e9ce, 0x00000001,0x00000000],
      [0xf323e215,0xa017f945, 0xd695d923,0xdaacad38, 0xccc4b5df,0xfc478821, 0x00000000,0x00000000],
      [0x3097da93,0x8d93c565, 0xad819ff0,0xfc60fcf2, 0x5a3136d0,0x71cc563c, 0x00000000,0x00000000],
      [0xb68af290,0xf6bec126, 0x71d90c78,0xcffabb7f, 0x40907380,0xc999f0fd, 0x00000001,0x00000000],
      [0xa9e97e5b,0x6db9b52a, 0x38d5db81,0xdba3be86, 0x677784db,0xc32aea66, 0x00000000,0x00000000],
      [0x22fe5385,0xc719d3f2, 0x8da73087,0xb8a0be40, 0xe089fb23,0xc348aa68, 0x00000001,0x00000000],
      [0xa62d683d,0x7a8b21b6, 0xe5b1c33b,0x536d7f12, 0x860a7d0f,0x498f009a, 0x00000001,0x00000000],
      [0x13e013ab,0x9979baba, 0x7410085a,0xae3cc134, 0xb414421e,0x8db026b0, 0x00000000,0x00000000],
      [0x3e192326,0xe9cdf15c, 0x9ac31715,0x1f4e217b, 0xfc2a4c1e,0x68624bb1, 0x00000007,0x00000000],
      [0x83e5da8f,0xe47a7de2, 0x70e3f7cd,0xb5a25520, 0xc1bcfd83,0x16e6acf5, 0x00000001,0x00000000],
      [0x40f83ff8,0xb1dbe8cb, 0xd31a8e1e,0x6ef00d8e, 0x37c30f10,0x2b8a4f5b, 0x00000001,0x00000000],
      [0x08cb4f0d,0xd94b5e0e, 0xd284f79f,0x55c6f6bd, 0x0c3fa413,0x01201f7a, 0x00000002,0x00000000],
      [0x9ef1b9db,0xd59f0980, 0x87543bea,0x23b124d8, 0x77a55b2e,0x6817914e, 0x00000005,0x00000000],
      [0xfee6005b,0x4a10fabf, 0x711b8615,0x7d7e86fd, 0x81a6a977,0x11b07585, 0x00000000,0x00000000],
      [0x3bca61f9,0xf80706fc, 0x1c5b3e04,0xd10d77e5, 0x0266d5e4,0x7839f8d1, 0x00000001,0x00000000],
      [0x9dea7d6a,0x49bd8134, 0x299fa165,0x72ba2885, 0xa53924d2,0xf46e6bde, 0x00000000,0x00000000],
      [0x200303ce,0xc4626e2c, 0x2d056644,0x11491d9a, 0xfd5716b8,0xa784a01f, 0x0000000b,0x00000000],
      [0x9b2ded86,0xeb9105af, 0x9646cd67,0xe18f7a82, 0xad52deea,0x8036bab2, 0x00000001,0x00000000],
      [0x41c3cc65,0x018f6b24, 0x1b06641f,0xe92ee244, 0xe3eb343b,0x859ac90d, 0x00000000,0x00000000],
      [0xbd97097a,0xbe3aac26, 0x279b3c97,0x9366ade1, 0x8d2d2ef6,0x9f0e3267, 0x00000001,0x00000000],
      [0x5d1232dd,0x78d5fa29, 0x04cd67a6,0x9f810314, 0xdb3ce64e,0xcb5c3be6, 0x00000000,0x00000000],
      [0x8b51f001,0xa3d3274c, 0x7915c631,0x62678701, 0x3364b631,0xc63a5892, 0x00000001,0x00000000],
      [0x4b2e9caa,0x4fc5b605, 0x224c13e9,0xbcccf5a5, 0xf98534ba,0xc5753d9c, 0x00000000,0x00000000],
      [0x3ba0073c,0x5a23d502, 0xd6ac719d,0xfb6818b9, 0x38a5ebcc,0xf00a4e9d, 0x00000000,0x00000000],
      [0xf2066a84,0xb0644114, 0x0f621b19,0xc154cbf8, 0xd26452e4,0xf4d87324, 0x00000000,0x00000000],
      [0x8669e6b4,0x0c51dceb, 0x748e18ec,0x8c2fe726, 0x5f198df0,0x99aaf3b9, 0x00000000,0x00000000],
      [0xe395650d,0x6b85b8d8, 0x3c1b5edb,0x5ed7ba2a, 0x4047381f,0xef54cfae, 0x00000001,0x00000000],
      [0xb46c6e41,0xa35be29e, 0xc838e192,0x2c30415e, 0x18f60212,0x1c3fe5cf, 0x00000003,0x00000000],
      [0x523ece5c,0x3bcd6af5, 0xd188345b,0x5f7282fe, 0xbb1e0ab4,0x9e4b4907, 0x00000000,0x00000000],
      [0x353c84c1,0x75674f68, 0x13d11a87,0x22429a50, 0xecf69bc7,0xde19ffee, 0x00000003,0x00000000],
      [0xdd7de421,0xf5d08bfa, 0x8527055d,0xc95adfda, 0xd23784fd,0x6b4fe942, 0x00000001,0x00000000],
      [0x311141b4,0x362f60c7, 0xb92f6c23,0x1d8758c0, 0x211feb9c,0xe1c8e595, 0x00000001,0x00000000],
      [0x649185c5,0x2cd92233, 0x33ff2ec8,0xeba82f6b, 0x35f4e7e8,0xbcac332a, 0x00000000,0x00000000],
      [0x3b9b7dc4,0x7e6a41d5, 0xf6a9d790,0xc81887e2, 0x7c7a5a40,0x3f124489, 0x00000000,0x00000000],
      [0xbdab421c,0xb22f64f2, 0xdf601217,0x447ef397, 0x4388e884,0x0f270478, 0x00000002,0x00000000],
      [0x63bd7ab2,0xa6c1adbf, 0x2c6e4f64,0xcf8af9aa, 0xbf5cdb88,0x0fc5f73f, 0x00000000,0x00000000],
      [0xbca679f2,0xd4dcc36a, 0x0a963faa,0x6a538c82, 0x265b88b4,0xef4a5881, 0x00000002,0x00000000],
      [0x9f0b08b8,0xbeed6278, 0x212d7fdd,0xf6acea37, 0x0631ced8,0x5f7349a0, 0x00000000,0x00000000],
      [0x6d60b7fd,0xbaab70a0, 0x4f056444,0x23d5b486, 0x8080b334,0x30eac36f, 0x00000005,0x00000000],
      [0xac8bb9fc,0x146f89cc, 0x64e76315,0x9d47eca7, 0x72c6b5ac,0x9a055ea3, 0x00000000,0x00000000],
      [0x421ee51a,0x748f7253, 0xe7a16738,0xe4bb22b1, 0x704993b0,0x912ed2f3, 0x00000000,0x00000000],
    ];

    for (const item of items) {
      const x = Int64.make(item[0], item[1]);
      const y = Int64.make(item[2], item[3]);

      const r = Int64.mul(x, y);
      r.low32.should.equal(item[4]);
      r.high32.should.equal(item[5]);

      if (!Int64.eq(y, Int64.make(0))) {
        const qref = Int64.make(item[6], item[7]);
        const q = Int64.divmod_u(x, y)[0];
        q.low32.should.equal(qref.low32);
        q.high32.should.equal(qref.high32);

        //console.log(r.low32,r.high32,'/',x.low32,x.high32,'=',y.low32,y.high32,'got',y_.low32,y_.high32);
        //y_.low32.should.equal(y.low32);
        //y_.high32.should.equal(y.high32);
      }
    }
  });

  it('should add/subtract correctly', () => {
    const items: [number, number, number, number, number, number][] = [
      [0,0,  0,0,  0,0],
      [1,0,  0,0,  1,0],
      [0,0,  1,0,  1,0],
      [1,0,  1,0,  2,0],
      [1,1,  1,1,  2,2],
      [13,17,23,29,0x24,0x2e],

      // Carry cases
      [0xffffffff,0x00000000, 0x00000001,0x00000000, 0x00000000,0x00000001],
      [0xfffffffa,0x80000042, 0x00000055,0x02427199, 0x0000004f,0x824271dc],
      [0xffffffff,0xffffffff, 0x00000001,0x00000000, 0x00000000,0x00000000],

      // Randomly generated test vectors
      [0xf78d0474,0xf06ed407, 0x2c2639e5,0x6f56228f, 0x23b33e59,0x5fc4f697],
      [0x765001e5,0x97720aaf, 0x94036645,0x0ec8c9c0, 0x0a53682a,0xa63ad470],
      [0x3e7d7d6b,0xeba6ac99, 0x9751bde5,0x78783b1b, 0xd5cf3b50,0x641ee7b4],
      [0x47b8b182,0x322a69c5, 0x8679fd6b,0xed1ea559, 0xce32aeed,0x1f490f1e],
      [0xb610c86e,0x0be589a8, 0x2ae33e09,0x36508fd4, 0xe0f40677,0x4236197c],
      [0x135688f8,0x6f188a59, 0x40c9e73a,0xad656168, 0x54207032,0x1c7debc1],
      [0x7c47b363,0x17618ec1, 0x76f5a17a,0xb09a04d4, 0xf33d54dd,0xc7fb9395],
      [0x616c79c9,0xdfe67293, 0x5eeb09fd,0x3a2a126e, 0xc05783c6,0x1a108501],
      [0x6115ed8e,0xfa078062, 0xc564cfd1,0x1b1c658a, 0x267abd5f,0x1523e5ed],
      [0x51d3e145,0xd13064bd, 0xe2fe39ea,0x0201fab7, 0x34d21b2f,0xd3325f75],
      [0x0d6e8f04,0xca8b5b3e, 0x1af4d3ae,0xc550c6f0, 0x286362b2,0x8fdc222e],
      [0x057804ad,0xd507aa0d, 0xa5fb9633,0x3c3e7aa9, 0xab739ae0,0x114624b6],
      [0xc7855f89,0xe5fe69a3, 0x51c08a82,0xaecd1b96, 0x1945ea0b,0x94cb853a],
      [0x05600a15,0xd346b01d, 0x70d8ef5e,0x6aa991e7, 0x7638f973,0x3df04204],
      [0x7ed28d84,0x57e0ff05, 0xf4e608de,0x4466f546, 0x73b89662,0x9c47f44c],
      [0xc9701c6c,0xe92a513b, 0x3c4bae86,0x333e91aa, 0x05bbcaf2,0x1c68e2e6],
      [0x0c215113,0x00843512, 0x1e48121f,0x44c98cf5, 0x2a696332,0x454dc207],
      [0xa62ecb10,0x144810c8, 0xd0653f91,0xbbdf28dc, 0x76940aa1,0xd02739a5],
      [0x06c7aee9,0xa8c78507, 0x9ba78ebb,0xfa21c4cd, 0xa26f3da4,0xa2e949d4],
      [0x91a8eac3,0xf587e230, 0x35143dcf,0x17c69b78, 0xc6bd2892,0x0d4e7da8],
      [0x8b9b0903,0x674e1a47, 0xa00de3ae,0x38988130, 0x2ba8ecb1,0x9fe69b78],
      [0xacb117a2,0x2bf0ad0f, 0x3d9e3d04,0x6bf89285, 0xea4f54a6,0x97e93f94],
      [0x17cb0866,0x923e4b39, 0xa1e143ad,0x0d3ec40c, 0xb9ac4c13,0x9f7d0f45],
      [0x583dcbfc,0x9f22815a, 0x9b556bfe,0x44dfc024, 0xf39337fa,0xe402417e],
      [0xf133d6f4,0xc9c19f11, 0x4615a102,0x49b56c55, 0x374977f6,0x13770b67],
      [0x4d259b3a,0x71a7e320, 0x0bc6751b,0xa0f65e81, 0x58ec1055,0x129e41a1],
      [0xff32ccd5,0xf2e3cd2e, 0xb889e8d6,0xf8eb2000, 0xb7bcb5ab,0xebceed2f],
      [0x78a80f28,0xcc25ad55, 0x0d609714,0x21b4a47f, 0x8608a63c,0xedda51d4],
      [0x3f29a638,0x58a627cb, 0xb89c895d,0x1cf7ed62, 0xf7c62f95,0x759e152d],
      [0xae13f0df,0x8371bfff, 0x4cd8ff90,0xc05f049f, 0xfaecf06f,0x43d0c49e],
      [0x39beade5,0x8714bb6f, 0xeec0c57b,0x9ed36cbd, 0x287f7360,0x25e8282d],
      [0x381d7b7c,0xb68d31fa, 0x5d17ce7e,0xf29672d9, 0x953549fa,0xa923a4d3],
      [0x41ca3cf6,0xdbcd3855, 0x5e4178a3,0x763b014e, 0xa00bb599,0x520839a3],
      [0x94102359,0xeaef7588, 0xc75ab692,0x3bf4bc31, 0x5b6ad9eb,0x26e431ba],
      [0xb0e46732,0x9d653cdc, 0x2bab6acf,0x66474ec8, 0xdc8fd201,0x03ac8ba4],
      [0x4cc12db1,0xe12d37f4, 0x5f6dfa64,0xe0471715, 0xac2f2815,0xc1744f09],
      [0xbc1806c3,0x70ad985e, 0xe4e036e8,0x5752d888, 0xa0f83dab,0xc80070e7],
      [0x28398dd5,0xcf3bc61f, 0x51daf430,0x929680e6, 0x7a148205,0x61d24705],
      [0x286d5002,0x8b3ca2ea, 0x3b2d3a59,0x28582aff, 0x639a8a5b,0xb394cde9],
      [0xb0500467,0x67a82267, 0x78de24ce,0xae92b15c, 0x292e2935,0x163ad3c4],
      [0x7176b5d6,0x90194457, 0xc4068479,0x089b9c1a, 0x357d3a4f,0x98b4e072],
      [0xaf69e157,0x43be213e, 0xf3dfbbdb,0x008778d0, 0xa3499d32,0x44459a0f],
      [0xb0299080,0x7e171d01, 0xd3ab23b3,0x04d28960, 0x83d4b433,0x82e9a662],
      [0xbb7cc52e,0xfd97481b, 0x8c4cad6f,0x0d77a3a5, 0x47c9729d,0x0b0eebc1],
      [0x445a8b8a,0x0231b5cf, 0xbb546c3c,0xd1185e33, 0xffaef7c6,0xd34a1402],
      [0x4b76dc64,0xdea2bc41, 0x351f0d80,0xbaaee520, 0x8095e9e4,0x9951a161],
      [0x6818442c,0xcfe9138e, 0xf128666e,0x9d38d690, 0x5940aa9a,0x6d21ea1f],
      [0xa954258d,0x85369cf2, 0x8e58b0fa,0x7d3a55b5, 0x37acd687,0x0270f2a8],
      [0x51dc95c1,0x9597b33d, 0x426465b2,0x90fcab52, 0x9440fb73,0x26945e8f],
      [0x03747ea2,0x58ef0c6a, 0x1df4920b,0xeeec3656, 0x216910ad,0x47db42c0],
      [0xca2e3741,0xa518e3c4, 0xb05b2f30,0xac0c0660, 0x7a896671,0x5124ea25],
      [0x63e89ab5,0xa60a5a69, 0xc2014e67,0x3dc3d6cb, 0x25e9e91c,0xe3ce3135],
      [0x86c82edd,0xe9f4d406, 0x4f365570,0x99d222e3, 0xd5fe844d,0x83c6f6e9],
      [0x1dbd866b,0xa2800884, 0x95d82d2e,0x8ede7a77, 0xb395b399,0x315e82fb],
      [0x3df4ef88,0xcb8c7ff1, 0x27ab84ca,0x77b05ff1, 0x65a07452,0x433cdfe2],
      [0x24bb1f3f,0x77963fe9, 0x6734f24c,0x2b074da6, 0x8bf0118b,0xa29d8d8f],
      [0x2224d8e3,0xd3a57fdd, 0x26a6231c,0x1e06ce23, 0x48cafbff,0xf1ac4e00],
      [0xe0f60b9d,0x0239630e, 0x9d69166a,0x6767021d, 0x7e5f2207,0x69a0652c],
      [0xed84378f,0xe161260a, 0x95114105,0x7f40d589, 0x82957894,0x60a1fb94],
      [0xf0884894,0xe562e487, 0xaf83cc1b,0xd8164837, 0xa00c14af,0xbd792cbf],
      [0x8a55d30c,0x3cd429d5, 0xb7c75621,0xf8f3d5f1, 0x421d292d,0x35c7ffc7],
      [0x377599ab,0x17c864f8, 0x26d6a467,0xd2069b56, 0x5e4c3e12,0xe9cf004e],
      [0x813de46c,0xe631c0bf, 0x75b6db90,0x9c810a7b, 0xf6f4bffc,0x82b2cb3a],
      [0x70de5a10,0xa22181ec, 0x1a19e788,0x1c43cc29, 0x8af84198,0xbe654e15],
      [0xdbbfae26,0xb4ef6915, 0x68ec1359,0xb41212e1, 0x44abc17f,0x69017bf7],
      [0x6f59cccc,0x37d28d50, 0x53f7d9f1,0x810a8b07, 0xc351a6bd,0xb8dd1857],
      [0x8871a81c,0xadb0dc66, 0x1fb9322e,0x3714805a, 0xa82ada4a,0xe4c55cc0],
      [0xb94b8997,0x71d93a54, 0x9bd0675d,0x017068ba, 0x551bf0f4,0x7349a30f],
      [0xb2a82b5f,0x485bbcaf, 0xb272bf23,0x7e21fb8f, 0x651aea82,0xc67db83f],
      [0xeee2c3fb,0x58370864, 0x3d784a6e,0x943d2a87, 0x2c5b0e69,0xec7432ec],
      [0xea66d071,0x39b7ae4e, 0x59b1e119,0xa8fbc10d, 0x4418b18a,0xe2b36f5c],
      [0x760d941a,0xfbaf4faf, 0xd70c365d,0xcb471721, 0x4d19ca77,0xc6f666d1],
      [0xe23130b8,0xa401925d, 0x28683116,0x78baf29a, 0x0a9961ce,0x1cbc84f8],
      [0x24637475,0x03943c29, 0xfab473e0,0x15b5e8c1, 0x1f17e855,0x194a24eb],
      [0x3b1b1b23,0x83227811, 0x6c9784f6,0xbe72ebfc, 0xa7b2a019,0x4195640d],
      [0x82c2dab5,0x796a6cbf, 0xbaa02626,0xc73bab08, 0x3d6300db,0x40a617c8],
      [0x075ca027,0xc49cf8b5, 0xd134acf4,0xbcfdafc7, 0xd8914d1b,0x819aa87c],
      [0x5150498e,0x23b1f3e7, 0x3c2a7fcc,0x48423579, 0x8d7ac95a,0x6bf42960],
      [0xa979b952,0x7f8ff458, 0x4259e3d9,0x3161a563, 0xebd39d2b,0xb0f199bb],
      [0xf1ed7429,0x1f9943e4, 0xbab7d5dc,0xfdb4c665, 0xaca54a05,0x1d4e0a4a],
      [0x654a5bf8,0xb344d4fa, 0x55448e12,0xa68f2b71, 0xba8eea0a,0x59d4006b],
      [0xd0a414f4,0xf4edd4bd, 0xa568560b,0xa2b47d74, 0x760c6aff,0x97a25232],
      [0x78eabbbc,0x5d30afb0, 0x61406d40,0x81e3a5f0, 0xda2b28fc,0xdf1455a0],
      [0xb32aa12d,0x15984db6, 0xc9ee3917,0xd6a24cea, 0x7d18da44,0xec3a9aa1],
      [0x39169c9c,0x28e427d6, 0x20b99de5,0xf1f48f47, 0x59d03a81,0x1ad8b71d],
      [0xec79d23f,0x3cddd3ed, 0x8d6a48c1,0x6109e1d3, 0x79e41b00,0x9de7b5c1],
      [0x53c1021b,0xf7908b11, 0xcd91e7e8,0x6a8faaac, 0x2152ea03,0x622035be],
      [0xeafacf2b,0xbfb85ede, 0x6cc30e11,0xd77f79f5, 0x57bddd3c,0x9737d8d4],
      [0xa7bb2895,0x5d4133ce, 0xe33c4271,0xc755894c, 0x8af76b06,0x2496bd1b],
      [0x9610ed3c,0x4de68fdf, 0xe059c3fb,0xfb41b437, 0x766ab137,0x49284417],
      [0xdcaa7aff,0x80801c13, 0xdcea7de3,0xb064426e, 0xb994f8e2,0x30e45e82],
      [0x4b14aa5d,0x80b1f106, 0x7379100a,0x99edfea0, 0xbe8dba67,0x1a9fefa6],
      [0xa3ba92f6,0xf3460e58, 0xd7c1db95,0x032c44db, 0x7b7c6e8b,0xf6725334],
      [0xcb75440c,0x301538a5, 0xe1ec3f9b,0x533c1e12, 0xad6183a7,0x835156b8],
      [0x2c8c4328,0x3e392365, 0xa4fb987c,0xacd72fc7, 0xd187dba4,0xeb10532c],
      [0xf7ed6e0f,0x27354c32, 0xab6f7c70,0xd0a7b6cc, 0xa35cea7f,0xf7dd02ff],
      [0xa17b0de3,0x4676b760, 0x762d18dd,0xbfdc0bd5, 0x17a826c0,0x0652c336],
      [0xca21edde,0x6941f3a8, 0xff405b72,0x474429e3, 0xc9624950,0xb0861d8c],
      [0x7b85897f,0x7ebcd5ab, 0x46a73a43,0x3e9e5136, 0xc22cc3c2,0xbd5b26e1],
      [0x0ab594cc,0x24004cb7, 0x945d6256,0xf21230f7, 0x9f12f722,0x16127dae],
    ];

    for (const item of items) {
      const x = Int64.make(item[0], item[1]);
      const y = Int64.make(item[2], item[3]);

      const r = Int64.add(x, y);
      r.low32.should.equal(item[4]);
      r.high32.should.equal(item[5]);

      const y_ = Int64.sub(r, x);
      y_.low32.should.equal(y.low32);
      y_.high32.should.equal(y.high32);
    }
  });

  it('should serialize decimal strings correctly', () => {
    const items: [number,number,string][] = [
      [0x01a05f33,0x27ca8431, "2867249458790293299"],
      [0x1c7bfd99,0x990f000e, "11029034073061064089"],
      [0x2cad0733,0x6386e3c8, "7171669905516594995"],
      [0x01de15f2,0x6da84968, "7901646257278293490"],
      [0xeeecdf6f,0x0e7993ae, "1043027168255074159"],
      [0x8a120468,0x2b6c0db9, "3128890931652199528"],
      [0xcf7ccc27,0xefc3dd91, "17276896213844413479"],
      [0x21a904ba,0x7b774360, "8896653669054350522"],
      [0xf7e981d4,0x1ac5abea, "1929137041068098004"],
      [0x7e51095c,0xc7126794, "14344641650600511836"],
      [0x7a1995bd,0x6fc8c57f, "8054905084852147645"],
      [0xb8dc1089,0x0ad2defb, "779930858208104585"],
      [0xc076632a,0x22d4a47e, "2509811756654027562"],
      [0x949e7847,0x6dd8cc73, "7915301141890365511"],
      [0xa4eaffc4,0x24e7a1a1, "2659271820614238148"],
      [0xb9b96907,0xa722dd8c, "12043431950023223559"],
      [0x1b96802c,0xd4384022, "15292043049972432940"],
      [0xffa8ce84,0x5422f260, "6062674546814144132"],
      [0xc7b29475,0xdec9c5b2, "16053579718384063605"],
      [0xc76aedc7,0xfac1516b, "18068812703336164807"],
      [0x5e03d701,0x94c37ad9, "10719546612075714305"],
      [0xd14909c2,0xe97f1fd2, "16825201723194280386"],
      [0x5521a2ac,0xd000a150, "14988156926286733996"],
      [0xef9fb290,0x9e13ea22, "11390705318320124560"],
      [0x6607a48c,0xd467c877, "15305422273780360332"],
      [0xa01a19ce,0xd45ea933, "15302854623046015438"],
      [0x103dd69e,0x2bd42b58, "3158196895923164830"],
      [0x1603d284,0x0772228c, "536529290670625412"],
      [0x004d96b7,0x7b16369f, "8869336572685555383"],
      [0x40547ac3,0xda93a9ff, "15750119235605789379"],
      [0x0d5ca5de,0x8fd6a6d5, "10364655026422195678"],
      [0xfb1489d3,0xf56274ab, "17681823369010645459"],
      [0x866606c0,0x6d0e5b6c, "7858318921477523136"],
      [0xd40176d4,0x91720d10, "10480453648772069076"],
      [0xab5d8936,0x9a057b9e, "11098412778134538550"],
      [0x9bee197b,0x765f1e83, "8529569769868630395"],
      [0x9559b38b,0xb896399a, "13300881885578769291"],
      [0xe28fe333,0x17a52cd1, "1703817313990468403"],
      [0xa5f0e7dc,0xdd20bbe8, "15933942089527650268"],
      [0xcbd3944b,0x3f11d365, "4544645933158339659"],
      [0xe527b120,0x81475b9d, "9315515087951737120"],
      [0xcb8a9d67,0x853516b5, "9598603150869831015"],
      [0xf8aa18cf,0x47db3062, "5177785398229342415"],
      [0xa0f08eff,0x6e797cb5, "7960530935885106943"],
      [0xb5158761,0x40f7bb6d, "4681416417538836321"],
      [0x9c0f99e8,0x09bf7a13, "702414291534322152"],
      [0xa05cdbe0,0x616bc968, "7019925895391271904"],
      [0x162ef6e3,0x1f8f08ba, "2274045932174505699"],
      [0x9d5c0d31,0xa22087fe, "11682486961030565169"],
      [0x5db701fd,0x64fccfcf, "7276919587461333501"],
      [0x53d6cdfc,0xae0154ad, "12538395940988833276"],
      [0xc79b8d76,0xad092d48, "12468546833961684342"],
      [0xa7554de6,0x3570e295, "3850826813787164134"],
      [0xa39a50e6,0xca72f17c, "14587987660629496038"],
      [0x641d682c,0x2ae21695, "3090057125215168556"],
      [0x6adc903c,0x3c43519c, "4342404197964877884"],
      [0xb1addd27,0x475367da, "5139565788741360935"],
      [0x5d3be980,0x08ad1cee, "625187733366368640"],
      [0x71967cd6,0x614ef71b, "7011813367104306390"],
      [0x9465dbf1,0x9c529aed, "11264235963194661873"],
      [0xaa41b213,0x32e15a9f, "3666311213459026451"],
      [0xa993f56b,0xb715f4d3, "13192719873372058987"],
      [0x5d99222a,0x8fc083d6, "10358424099668697642"],
      [0x227f95ef,0xb2cd2fa6, "12884006499566720495"],
      [0xaa101e4e,0xa9f72a42, "12247304177466744398"],
      [0x74b11e16,0xe9ce3f80, "16847473076985732630"],
      [0xe0bde20a,0x1ddc1b9e, "2151625091165577738"],
      [0xe9dde0e9,0xdcdc3a95, "15914659598768660713"],
      [0xe64f206b,0x100c9a68, "1156468979658596459"],
      [0xec1b3ccb,0x17630cf0, "1685204914459589835"],
      [0xdf706023,0xa2e764e9, "11738461909403328547"],
      [0xb37f3408,0xb2b6b718, "12877681501231068168"],
      [0xbc744da1,0xe149fb46, "16233782613061684641"],
      [0x0ec9a13a,0xcd839b73, "14808850918195962170"],
      [0xf2ae8410,0x811035c5, "9299992354816427024"],
      [0xac6cab4b,0xe5de7496, "16563804670001982283"],
      [0x42207ff1,0xaec54ec9, "12593558559316279281"],
      [0xf978ce14,0x1a038c6f, "1874496282470960660"],
      [0x51dde024,0xac6eafa8, "12425061559424639012"],
      [0x3dbddddf,0xba804278, "13438814372272922079"],
      [0x0e2c01f7,0x7d006512, "9007310382962573815"],
      [0x725863c7,0x37fc8897, "4034249550256956359"],
      [0x466ecd83,0x6e1b249c, "7933975422158425475"],
      [0x996f9115,0x62a7fa83, "7108925979949502741"],
      [0x9a05d9d8,0x00858ef3, "37593348814789080"],
      [0x2322072f,0x769b8ffe, "8546583039539545903"],
      [0x076f7a44,0x5ac9444f, "6541835039950207556"],
      [0xf0e3fad4,0x61bb1d09, "7042254370857286356"],
      [0x0e7ba8bc,0x1fa0a230, "2278999738734586044"],
      [0xbfa02a00,0xad6ebe22, "12497135072452815360"],
      [0x4abd4fd2,0xd57fd326, "15384247013537042386"],
      [0x3c49c48e,0x5898e6b4, "6384106133577647246"],
      [0x39ceece7,0x9254bf7e, "10544263176437820647"],
      [0x57fb9f57,0xa78b06a7, "12072750541902159703"],
      [0x77c78202,0x2aa8b02d, "3073900455009944066"],
      [0xce6f73bb,0x60337a5e, "6932018799062250427"],
      [0x90d7ca7b,0xf3d8d0c8, "17571023506028087931"],
      [0xc7c45b46,0xe8250c06, "16727789614198446918"],
      [0xa3af227b,0x311e7c0f, "3539402763772306043"],
      [0x4a316599,0xa6a3b0cc, "12007635422964442521"],
    ];

    for (const item of items) {
      const v = Int64.make(item[0], item[1]);
      v.toDecimalString_u().should.equal(item[2]);
    }
  });
});