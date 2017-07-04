#-*- coding: UTF-8 -*-

require 'pathname'
require "fileutils"

fileName = ARGV.first.dup # ARGV[0]
InPutARGV = ARGV[1]

# 替换字符串格式
# 羊肉串
FileName = '<%= name %>'
# 驼峰
HumpName = '<%= hump %>'
# 首字母大写
CapName  = '<%= upCaseName %>'
# 模板目录
InPut    = InPutARGV||'generator'
# 输出目录
OutPut   = 'target'

humpName = fileName.gsub /-\w/ do |x|
	x.delete("-").upcase
end
capName = (humpName[0].upcase).concat(humpName.slice(1,humpName.length))
# puts fileName,humpName,capName

# 清空并复制一份目录
FileUtils.rm_rf(OutPut) if File.directory?(OutPut)
FileUtils.copy_entry(InPut,OutPut)

puts "开始替换文件内容..."
Dir["#{OutPut}/**/**.*"].each {|f|
	text = File.read(f).force_encoding("UTF-8")
	replace = text.gsub /<%= ((name)|(hump)|(upCaseName)) %>/ do |nm|
		if nm==FileName
			fileName
		elsif nm==HumpName
			humpName
		elsif nm==CapName
			capName
		else # 误匹配
			nm
		end
	end
	File.open(f, "w") {|file|
		file.puts replace
	} unless !replace
	puts "#{f}替换完成"
	newName = f.gsub(/xxx/,fileName)
	FileUtils.mkdir_p(File.dirname(newName))
	# File.extname(f)
	# File.basename(f, File.extname(f))
	File.rename(f,newName)
	puts "#{f}重命名为#{newName}"
}
FileUtils.rm_rf(OutPut+'/xxx')
