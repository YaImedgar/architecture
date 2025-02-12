#!/bin/bash

# Получаем версию проекта из аргумента командной строки
project_version=$1

# Проверяем, что версия проекта была передана в качестве аргумента
if [ -z "$project_version" ]; then
  echo "Использование: $0 <project_version>"
  exit 1
fi

# Формируем имя remote и имя папки для поддерева на основе версии проекта
remote_name="architecture-sprint-${project_version}"
subtree_prefix="architecture-sprint-${project_version}"

# URL репозитория, который будет добавлен как remote.
remote_url="https://github.com/Yandex-Practicum/architecture-sprint-${project_version}.git"

# Добавляем remote репозиторий
git remote add -f "$remote_name" "$remote_url"

# Добавляем проект как поддерево
git subtree add --prefix "$subtree_prefix" "$remote_name" main --squash

# Фиксируем изменения
git commit -m "Добавлен проект ${project_version} как subtree"

echo "Проект ${project_version} успешно добавлен как subtree в папку ${subtree_prefix}"
