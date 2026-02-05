'use client';

export default function QuantityCard() {
  return (
    <div className='flex items-center justify-center gap-3'>
      <button
        onClick={() => console.log('>>>')}
        className='btn bg-blue-300 text-white'
      >
        -
      </button>
      <h6>1</h6>
      <button className='btn bg-blue-300 text-white'>+</button>
    </div>
  );
}
