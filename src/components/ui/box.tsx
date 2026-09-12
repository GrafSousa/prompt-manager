export type BoxProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export function Box<T extends React.ElementType = 'div'>(props: BoxProps<T>) {
  const { as = 'div', ...rest } = props;

  const Component = as || 'div';

  return <Component {...rest} />;
}
