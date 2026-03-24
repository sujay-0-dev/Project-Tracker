import type { User } from '../../types'

interface Props {
  user: User
  size?: number // px, defaults to 28
  style?: React.CSSProperties
  className?: string
}

export function AssigneeAvatar({ user, size = 28, style, className = '' }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: user.color,
        ...style,
      }}
      title={user.name}
    >
      {user.initials}
    </div>
  )
}
