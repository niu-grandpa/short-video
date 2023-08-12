<template>
  <ALayout>
    <Header />
    <ALayout hasSider>
      <SideMain />
      <ContentMain>
        <slot />
      </ContentMain>
    </ALayout>
  </ALayout>
</template>
