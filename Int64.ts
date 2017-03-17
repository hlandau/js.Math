const decScratch = new Uint8Array(21);
for (let i=0; i<21; ++i)
  decScratch[i] = 0x30;

export default class Int64 {
  private __buf: Uint32Array;

  constructor(lo: number, hi?: number) {
    this.__buf = new Uint32Array(2);
    this.__buf[0] = lo; // Automatically converts to twos complement representation.
    this.__buf[1] = hi || 0;

    Object.freeze(this);
  }

  static make(lo: number, hi?: number) {
    hi = hi || 0;
    if (!hi) {
      if (lo === 0)
        return i64_0;
      if (lo === 1)
        return i64_1;
    }
    return new Int64(lo, hi);
  }

  static add(x: Int64, y: Int64): Int64 {
    const Xlo = x.low32, Xhi = x.high32;
    const Ylo = y.low32, Yhi = y.high32;

    const s = Xlo + Ylo;
    const Rlo = s & 0xFFFFFFFF;
    const k = (s/0x100000000) & 0xFFFFFFFF;
    const Rhi = (Xhi + Yhi + k) & 0xFFFFFFFF;
    return Int64.make(Rlo, Rhi);
  }

  static sub(x: Int64, y: Int64): Int64 {
    const Xlo = x.low32, Xhi = x.high32;
    const Ylo = y.low32, Yhi = y.high32;

    const s = Xlo - Ylo;
    const Rlo = s & 0xFFFFFFFF;
    const k = s < 0 ? -1 : 0;
    const Rhi = (Xhi - Yhi + k) & 0xFFFFFFFF;

    return Int64.make(Rlo, Rhi);
  }

  static mul(x: Int64, y: Int64): Int64 {
    const Xlo = x.low32, Xhi = x.high32;
    const Ylo = y.low32, Yhi = y.high32;

    const X0 = Xlo & 0xFFFF;
    const X1 = Xlo >>> 16;
    const X2 = Xhi & 0xFFFF;
    const X3 = Xhi >>> 16;

    const Y0 = Ylo & 0xFFFF;
    const Y1 = Ylo >>> 16;
    const Y2 = Yhi & 0xFFFF;
    const Y3 = Yhi >>> 16;

    let k = 0, t = 0;
    let R0 = 0, R1 = 0, R2 = 0, R3 = 0, R4 = 0, R5 = 0, R6 = 0, R7 = 0;

    //j=0:
      //i=0:
        t = X0 * Y0 + R0 + k;
        R0 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=1:
        t = X1 * Y0 + R1 + k;
        R1 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=2:
        t = X2 * Y0 + R2 + k;
        R2 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=3:
        t = X3 * Y0 + R3 + k;
        R3 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      R4 = k;
    //j=1:
      k = 0;
      //i=0:
        t = X0 * Y1 + R1 + k;
        R1 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=1:
        t = X1 * Y1 + R2 + k;
        R2 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=2:
        t = X2 * Y1 + R3 + k;
        R3 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=3:
        t = X3 * Y1 + R4 + k;
        R4 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      R5 = k;
    //j=2:
      k = 0;
      //i=0:
        t = X0 * Y2 + R2 + k;
        R2 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=1:
        t = X1 * Y2 + R3 + k;
        R3 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=2:
        t = X2 * Y2 + R4 + k;
        R4 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=3:
        t = X3 * Y2 + R5 + k;
        R5 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      R6 = k;
    //j=3:
      k = 0;
      //i=0:
        t = X0 * Y3 + R3 + k;
        R3 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=1:
        t = X1 * Y3 + R4 + k;
        R4 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=2:
        t = X2 * Y3 + R5 + k;
        R5 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      //i=3:
        t = X3 * Y3 + R6 + k;
        R6 = t & 0xFFFF;
        k = (t/0x10000) & 0xFFFF;
      R7 = k;

    const Rlo = R0 + (R1<<16);
    const Rhi = R2 + (R3<<16);

    return Int64.make(Rlo, Rhi);
  }

  static lsh(x: Int64, n: number): Int64 {
    const Xlo = x.low32, Xhi = x.high32;
    return Int64.make(Xlo << n, (Xhi << n) + (Xlo >>> (32-n)));
  }

  //signed-unsafe
  static rsh(x: Int64, n: number): Int64 {
    const Xlo = x.low32, Xhi = x.high32;
    return Int64.make((Xlo >>> n) + (Xhi << (32-n)), Xhi >>> n);
  }

  static eq(x: Int64, y: Int64): boolean {
    const Xlo = x.low32, Xhi = x.high32;
    const Ylo = y.low32, Yhi = y.high32;
    return Xlo === Ylo && Xhi === Yhi;
  }

  //signed-unsafe
  static ge_u(x: Int64, y: Int64): boolean {
    const Xlo = x.low32, Xhi = x.high32;
    const Ylo = y.low32, Yhi = y.high32;

    if (Xhi > Yhi)
      return true;
    if (Xhi < Yhi)
      return false;

    if (Xlo < Ylo)
      return false;
    return true;
  }

  static ge(x: Int64, y: Int64): boolean {
    const v = Int64.sub(x, y);
    return (v.high32 < 0x80000000);
  }

  static negate(x: Int64): Int64 {
    let Xlo = x.low32, Xhi = x.high32;
    Xhi = (Xhi ^ 0xFFFFFFFF);
    if (!Xlo)
      Xhi = (Xhi+1) & 0xFFFFFFFF;
    Xlo = ((Xlo ^ 0xFFFFFFFF) + 1) & 0xFFFFFFFF;
    return Int64.make(Xlo, Xhi);
  }

  //signed-unsafe
  static divmod_u(x: Int64, y: Int64): [Int64, Int64] {
    let quot: Int64 = i64_0;
    let qbit: Int64 = i64_1;
    if (Int64.eq(y, i64_0))
      throw new Error(`divide by zero`);

    while (!Int64.ge_u(y, i64_msb)) {
      y    = Int64.lsh(y,    1);
      qbit = Int64.lsh(qbit, 1);
    }

    while (!qbit.isZero()) {
      if (Int64.ge_u(x, y)) {
        x = Int64.sub(x, y);
        quot = Int64.add(quot, qbit);
      }

      y    = Int64.rsh(y,    1);
      qbit = Int64.rsh(qbit, 1);
    }

    return [quot, x];
  }

  static div(x: Int64, y: Int64): Int64 {
    let neg = false;

    if (!Int64.ge(x, i64_0)) {
      x = Int64.negate(x);
      neg = true;
    }

    if (!Int64.ge(y, i64_0)) {
      y = Int64.negate(y);
      neg = !neg;
    }

    let v = Int64.divmod_u(x, y)[0];
    if (neg)
      v = Int64.negate(v);

    return v;
  }

  toDecimalString_u(): string {
    if (!this.__buf[0] && !this.__buf[1])
      return '0';

    let s = '';
    let v: Int64 = this;
    while (!Int64.eq(v, i64_0)) {
      const [q,r] = Int64.divmod_u(v, i64_10);
      s = '0123456789'[r.low32] + s;
      v = q;
    }

    return s;
  }

  toDecimalString(): string {
    if (!this.__buf[0] && !this.__buf[1])
      return '0';

    if (this.__buf[1] >= 0x80000000)
      return '-' + Int64.negate(this).toDecimalString_u();

    return this.toDecimalString_u();
  }

  get low32(): number { return this.__buf[0]; }
  get high32(): number { return this.__buf[1]; }

  isZero(): boolean { return this.__buf[0] === 0 && this.__buf[1] === 0; }

  toHexString(): string { return '0x'; }
  toString(): string { return this.toDecimalString(); }
  inspect(): string { return `Int64(${this.toString()})`; }
}

const i64_0   = new Int64(0);
const i64_1   = new Int64(1);
const i64_10  = new Int64(10);
const i64_msb = new Int64(0, 0x80000000);
