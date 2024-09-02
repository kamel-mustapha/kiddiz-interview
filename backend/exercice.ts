type variableType = string | void | null | undefined;

const buildAvatarUrl = (context: variableType, prenom: variableType, nom: variableType): string => {
  if (typeof context === "string" && context?.includes("default")) return "";
  return `https://ui-avatars.com/api/?name=${prenom ? prenom[0].toUpperCase() : ""}+${nom ? nom[0].toUpperCase() : ""}`;
};

console.log(buildAvatarUrl("z default", "", ""));
