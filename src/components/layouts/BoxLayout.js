import React from 'react';

const BoxLayout = Screen => {
  const BoxxedLayout = () => (
    <div>
      <p>Box Layout</p>
      <Screen />
    </div>
  );
  return BoxxedLayout;
};

export { BoxLayout };
