type Props = {
  onDigit: (value: number | null) => void
}

export function NumberPad({ onDigit }: Props) {
  return (
    <div className="number-pad" role="group" aria-label="数字入力パッド">
      {Array.from({ length: 9 }, (_, index) => index + 1).map((digit) => (
        <button type="button" className="digit-button" key={digit} onClick={() => onDigit(digit)}>
          {digit}
        </button>
      ))}
      <button type="button" className="erase-button" onClick={() => onDigit(null)}>
        <span aria-hidden="true">⌫</span>　数字を消す
      </button>
    </div>
  )
}
